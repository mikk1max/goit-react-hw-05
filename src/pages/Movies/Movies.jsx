import { useEffect, useState } from "react";
import { getMoviesByQuery } from "../../service/api";

import s from "./Movies.module.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Movies = () => {
  const location = useLocation();
  const [movies, setMovies] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(query);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getMoviesByQuery(query);
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    };
    if (query) {
      fetchData();
    }
  }, [query]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== query) {
      updateSearchParams("query", inputValue.trim());
    }
    
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <Loader />}
      <ul>
        {movies?.length > 0
          ? movies?.map((movie) => (
              <li key={movie.id} className={s.movieCard}>
                <div className={s.imgContainer}>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : "/no-image.png"
                    }
                    alt={movie.title}
                  />
                </div>
                <div className={s.textContainer}>
                  <p>{movie.title}</p>
                  <p>{movie.overview}</p>
                  <div className={s.moreBtn}>
                    <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                      Show more
                    </Link>
                  </div>
                </div>
              </li>
            ))
          : movies && (
              <p
                style={{ textAlign: "center", fontSize: 24, color: "#003580" }}
              >
                No movies found
              </p>
            )}
      </ul>
    </div>
  );
};

export default Movies;
