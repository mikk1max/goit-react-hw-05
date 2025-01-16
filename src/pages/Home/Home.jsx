import { useState } from "react";
import { useEffect } from "react";
import { getPopularMovies } from "../../service/api";
import { Link, useLocation } from "react-router-dom";

import s from "./Home.module.css"

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPopularMovies();

        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <ul className={s.moviesList}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location}}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
