document.addEventListener('DOMContentLoaded', () => {

    const appData = {
        appName: 'CineSphere',
        featuredMovie: {
            title: 'Echoes of the Cosmos',
            description: 'A brilliant astronaut embarks on a solo mission to a distant planet, only to discover a profound mystery that challenges the very nature of time and space.',
            imageUrl: 'https://placehold.co/1200x600/1e293b/fff?text=Featured+Movie',
            genre: 'Sci-Fi'
        },
        movies: [
            { title: 'The Serpent’s Lullaby', year: 2023, genre: 'Thriller', imageUrl: 'https://placehold.co/400x600/334155/fff?text=Movie+1' },
            { title: 'City of Whispers', year: 2024, genre: 'Mystery', imageUrl: 'https://placehold.co/400x600/334155/fff?text=Movie+2' },
            { title: 'The Last Stand of Oakhaven', year: 2022, genre: 'Fantasy', imageUrl: 'https://placehold.co/400x600/334155/fff?text=Movie+3' },
            { title: 'Pixel Pirates', year: 2023, genre: 'Adventure', imageUrl: 'https://placehold.co/400x600/334155/fff?text=Movie+4' }
        ]
    };

    function renderHeader(data) {
        const headerElement = document.getElementById('header');
        headerElement.innerHTML = `
            <h1>${data.appName}</h1>
            <nav>
                <a href="#">Home</a>
                <a href="#">Movies</a>
                <a href="#">Series</a>
            </nav>
        `;
    }

    function renderHero(movie) {
        const heroSection = document.getElementById('hero-section');
        heroSection.classList.add('hero-section');
        heroSection.innerHTML = `
            <img src="${movie.imageUrl}" alt="${movie.title}">
            <div class="hero-content">
                <h2>${movie.title}</h2>
                <p>${movie.description}</p>
                <span class="genre">${movie.genre}</span>
                <button>Watch Now</button>
            </div>
        `;
    }

    function renderMovieList(movies) {
        const container = document.getElementById('movie-cards-container');
        container.innerHTML = '';
        movies.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('movie-card');
            
            card.addEventListener('click', () => {
                console.log(`You clicked on: ${movie.title}`);
            });

            card.innerHTML = `
                <img src="${movie.imageUrl}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>${movie.year}</p>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function renderFooter(data) {
        const footerElement = document.getElementById('footer');
        const currentYear = new Date().getFullYear();
        footerElement.innerHTML = `
            <p>&copy; ${currentYear} ${data.appName}. All rights reserved.</p>
        `;
    }

    renderHeader(appData);
    renderHero(appData.featuredMovie);
    renderMovieList(appData.movies);
    renderFooter(appData);
});
