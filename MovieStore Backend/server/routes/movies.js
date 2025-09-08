const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'movie-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    console.error('Get movies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Get movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search movies
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const movies = await Movie.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { director: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });
    
    res.json(movies);
  } catch (error) {
    console.error('Search movies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get new movies (last 30 days)
router.get('/category/new', async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const movies = await Movie.find({
      createdAt: { $gte: thirtyDaysAgo }
    }).sort({ createdAt: -1 });
    
    res.json(movies);
  } catch (error) {
    console.error('Get new movies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get most watched movies
router.get('/category/most-watched', async (req, res) => {
  try {
    const movies = await Movie.find({ views: { $gt: 0 } })
      .sort({ views: -1 })
      .limit(20);
    
    res.json(movies);
  } catch (error) {
    console.error('Get most watched movies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get old movies (older than 2 years from movie year, not creation date)
router.get('/category/old', async (req, res) => {
  try {
    const twoYearsAgo = new Date().getFullYear() - 2;
    const movies = await Movie.find({
      year: { $lt: twoYearsAgo }
    }).sort({ year: -1 });
    
    res.json(movies);
  } catch (error) {
    console.error('Get old movies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Increment view count
router.patch('/:id/view', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json({ message: 'View count updated', views: movie.views });
  } catch (error) {
    console.error('Update views error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new movie (Admin only)
router.post('/', adminAuth, upload.single('photo'), async (req, res) => {
  try {
    const { name, year, director, description, type } = req.body;
    
    const movieData = {
      name,
      year: parseInt(year),
      director,
      description,
      type
    };
    
    if (req.file) {
      movieData.photo = req.file.filename;
    }
    
    const movie = new Movie(movieData);
    await movie.save();
    
    res.status(201).json(movie);
  } catch (error) {
    console.error('Create movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update movie (Admin only)
router.put('/:id', adminAuth, upload.single('photo'), async (req, res) => {
  try {
    const { name, year, director, description, type } = req.body;
    
    const updateData = {
      name,
      year: parseInt(year),
      director,
      description,
      type
    };
    
    // Handle photo update
    if (req.file) {
      // Delete old photo if exists
      const existingMovie = await Movie.findById(req.params.id);
      if (existingMovie && existingMovie.photo) {
        const oldPhotoPath = path.join(uploadsDir, existingMovie.photo);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
      }
      updateData.photo = req.file.filename;
    }
    
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    console.error('Update movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete movie (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Delete photo file if exists
    if (movie.photo) {
      const photoPath = path.join(uploadsDir, movie.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }
    
    await Movie.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Delete movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;