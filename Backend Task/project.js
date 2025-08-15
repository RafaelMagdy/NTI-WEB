import React, { useState, useEffect } from 'react';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [newMovie, setNewMovie] = useState({ title: '', director: '', year: '' });
    const [editingMovie, setEditingMovie] = useState(null);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setMovies([
            { id: 1, title: 'Inception', director: 'Christopher Nolan', year: '2010' },
            { id: 2, title: 'The Matrix', director: 'The Wachowskis', year: '1999' },
            { id: 3, title: 'Parasite', director: 'Bong Joon Ho', year: '2019' },
        ]);
    }, []);

    const handleAddMovie = (e) => {
        e.preventDefault();
        if (newMovie.title && newMovie.director && newMovie.year) {
            const newId = movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 1;
            setMovies([...movies, { id: newId, ...newMovie }]);
            setNewMovie({ title: '', director: '', year: '' });
        }
    };

    const handleDeleteMovie = (id) => {
        setMovies(movies.filter(movie => movie.id !== id));
    };

    const handleUpdateMovie = (e) => {
        e.preventDefault();
        setMovies(movies.map(movie =>
            movie.id === editingMovie.id ? editingMovie : movie
        ));
        setEditingMovie(null);
    };

    const handleEditClick = (movie) => {
        setEditingMovie(movie);
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.year.includes(searchQuery)
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Movie Backend Simulator
                </h1>
                
                <div className="mb-8 flex justify-center space-x-4">
                    {!isUserAdmin ? (
                        <button
                            onClick={() => setIsUserAdmin(true)}
                            className="py-2 px-4 rounded-full font-bold transition duration-200 ease-in-out bg-green-500 text-white hover:bg-green-600"
                        >
                            Log In as Admin
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsUserAdmin(false)}
                            className="py-2 px-4 rounded-full font-bold transition duration-200 ease-in-out bg-red-500 text-white hover:bg-red-600"
                        >
                            Log Out as Admin
                        </button>
                    )}
                </div>

                {isUserAdmin && (
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
                        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-300">Add a New Movie</h2>
                        <form onSubmit={handleAddMovie} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Movie Title"
                                value={newMovie.title}
                                onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Director"
                                value={newMovie.director}
                                onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Year"
                                value={newMovie.year}
                                onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                            >
                                Add Movie
                            </button>
                        </form>
                    </div>
                )}

                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-purple-300">Movies in Database</h2>
                    
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    
                    <div className="space-y-4">
                        {filteredMovies.length > 0 ? (
                            filteredMovies.map(movie => (
                                <div key={movie.id} className="flex flex-col sm:flex-row items-center justify-between bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600 transition duration-200 ease-in-out hover:bg-gray-600">
                                    <div className="flex-1 text-center sm:text-left mb-2 sm:mb-0">
                                        <p className="text-xl font-bold text-blue-200">{movie.title}</p>
                                        <p className="text-gray-300">Directed by: {movie.director} ({movie.year})</p>
                                    </div>
                                    {isUserAdmin && (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditClick(movie)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteMovie(movie.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-400">No movies found. Add one above!</p>
                        )}
                    </div>
                </div>

                {editingMovie && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 max-w-lg w-full relative">
                            <button
                                onClick={() => setEditingMovie(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h2 className="text-2xl font-semibold mb-6 text-center text-yellow-300">Edit Movie</h2>
                            <form onSubmit={handleUpdateMovie} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Movie Title"
                                    value={editingMovie.title}
                                    onChange={(e) => setEditingMovie({ ...editingMovie, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Director"
                                    value={editingMovie.director}
                                    onChange={(e) => setEditingMovie({ ...editingMovie, director: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Year"
                                    value={editingMovie.year}
                                    onChange={(e) => setEditingMovie({ ...editingMovie, year: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default App;