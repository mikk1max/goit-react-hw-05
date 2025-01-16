import { useEffect, useState } from "react";
import { getMoviesByQuery } from "../../service/api";

const Movies = () => {
  const [movies, setMovies] = useState();
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMoviesByQuery(query);
        console.log(data);
        setMovies(data.results);
        setOnSearch(false);
        setQuery("");
      } catch (error) {
        console.log(error);
      }
    };
    if (query !== "" && onSearch) {
      fetchData();
    }
  }, [query, onSearch]);

  const handleChange = (q) => {
    setQuery(q);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOnSearch(true);
        }}
      >
        <input
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies?.length > 0 ? (
          movies?.map((movie) => <li key={movie.id}>
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
          </li>)
        ) : (
          <p>No movies found</p>
        )}
      </ul>
    </div>
  );
};

export default Movies;
