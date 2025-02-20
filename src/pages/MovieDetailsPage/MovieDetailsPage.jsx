import { useEffect, useRef, useState } from "react";
import { getMovieDetails } from "../../service/api.js";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Divider } from "@fluentui/react-divider";
import { IoMdArrowRoundBack } from "react-icons/io";

import s from "./MovieDetailsPage.module.css";
import { getYearFromDate } from "../../service/helpers.js";
import Loader from "../../components/Loader/Loader.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";

const MovieDetailsPage = () => {
  const location = useLocation();
  const backLinkHref = useRef(location?.state?.from || "/");

  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const movieId = useParams().movieId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  const getVotePercent = (value) => `${Math.round(value * 10)}%`;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : movieDetails.title ? (
        <>
          <div className={s.backLink}>
            <Link to={backLinkHref.current}>
              <IoMdArrowRoundBack size={28} color="#003580" />
              <span style={{ marginLeft: 5 }}>Back</span>
            </Link>
          </div>

          <div className={s.detailsContainer}>
            <figure className={s.imgContainer}>
              <img
                src={
                  movieDetails.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                    : "/no-image.png"
                }
                alt={movieDetails.title || "Movie poster"}
              />
            </figure>
            <div className={s.detailsInfoBox}>
              <h2>
                {`${movieDetails.title} ${
                  movieDetails.release_date
                    ? `(${getYearFromDate(movieDetails.release_date)})`
                    : ""
                }`}
              </h2>
              <p>User score: {getVotePercent(movieDetails.vote_average)}</p>
              <h3>Overview</h3>
              <p>{movieDetails.overview}</p>
              <h3>Genres</h3>
              <p>{movieDetails.genres?.map((item) => item.name).join(", ")}</p>
            </div>
          </div>

          <Divider style={{ marginTop: 20 }} />

          <ul className={s.addInfoList}>
            <li className={s.addInfoListItem}>
              <Link to="cast" state={{ from: backLinkHref.current }}>
                Cast
              </Link>
            </li>
            <li className={s.addInfoListItem}>
              <Link to="reviews" state={{ from: backLinkHref.current }}>
                Reviews
              </Link>
            </li>
          </ul>

          <Outlet />
        </>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default MovieDetailsPage;
