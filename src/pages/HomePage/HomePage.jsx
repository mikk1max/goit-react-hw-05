import { useState } from "react";
import { useEffect } from "react";
import { getPopularMovies } from "../../service/api";
import { Link, useLocation } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import s from "./HomePage.module.css";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getPopularMovies(page);
        setMovies(data);
      } catch (error) {
        toast.error(`Something went wrong!\n${error}`, {
          position: "top-right",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <ul className={s.moviesList}>
          {movies.results?.map((movie) => (
            <li key={movie.id} className={s.movieItem}>
              <div className={s.imgContainer}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : "/no-image.png"
                  }
                />
              </div>
              <div className={s.movieTitle}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                  {movie.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={<GrFormNext size={36} />}
          onPageChange={(event) => setPage(event.selected + 1)}
          pageRangeDisplayed={5}
          pageCount={movies?.total_pages || 1}
          previousLabel={<GrFormPrevious size={36} />}
          renderOnZeroPageCount={null}
          containerClassName={s.pagination}
          activeClassName={s.active}
          disabledClassName={s.disabled}
          forcePage={page - 1}
        />
      )}
    </div>
  );
};

export default HomePage;
