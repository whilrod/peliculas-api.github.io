import { useEffect, useState } from 'react';
import { getNowPlayingMovies, searchMovies } from '../services/tmdb';
import MovieList from '../components/MovieList';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

 useEffect(() => {
  const fetch = async () => {
    try {
      if (isSearching && query.trim() !== '') {
        const res = await searchMovies(query, page);
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      } else {
        const res = await getNowPlayingMovies(page);
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
      }
    } catch (err) {
      console.error('Error al obtener películas:', err);
    }
  };

  fetch();
}, [page, query, isSearching]);

const handleSearch = (e) => {
  e.preventDefault();
  const trimmed = query.trim();
  
  if (trimmed !== '') {
    setIsSearching(true);
    setPage(1);
  } else {
    setIsSearching(false);
    setPage(1);
  }
};

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    isSearching==true;
    if (page < totalPages) setPage(page + 1);
  };

  const handlePageClick = (num) => {
    if (num !== page) setPage(num);
  };

  useEffect(() => {
  if (query.trim() === '') {
    setIsSearching(false);
    setPage(1);
  }
}, [query]);

  // Mostrar máximo 5 páginas por bloque
  const getPageNumbers = () => {
    const maxButtons = 5;
    const start = Math.max(1, page - Math.floor(maxButtons / 2));
    const end = Math.min(start + maxButtons - 1, totalPages);
    const pageNumbers = [];

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div>
      <h1>🎬 Películas</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {/* Paginación numérica */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button onClick={handlePrev} disabled={page === 1}>⬅</button>

        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => handlePageClick(num)}
            style={{
              fontWeight: num === page ? 'bold' : 'normal',
              backgroundColor: num === page ? '#007bff' : 'white',
              color: num === page ? 'white' : 'black',
              border: '1px solid #ccc',
              padding: '0.5rem',
            }}
          >
            {num}
          </button>
        ))}

        <button onClick={handleNext} disabled={page === totalPages}>➡</button>
      </div>
      <MovieList movies={movies} /> 
    </div>
  );
}
