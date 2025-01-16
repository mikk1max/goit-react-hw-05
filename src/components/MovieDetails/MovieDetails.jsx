import { useEffect, useState } from "react";
import { getMovieDetails } from "../../service/api";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Divider } from "@fluentui/react-divider";
import { IoMdArrowRoundBack } from "react-icons/io";

import s from "./MovieDetails.module.css";
import { getIdFromLocation, getYearFromDate } from "../../service/helpers";

const MovieDetails = () => {
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieDetails(+getIdFromLocation(location));

        setMovieDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location]);

  const getVotePercent = (value) => {
    return value * 10 + "%";
  };

  const backLinkHref = location.state?.from;

  return (
    <>
      <div className={s.backLink}>
        <Link to={backLinkHref}>
          <IoMdArrowRoundBack size={28} color="#003580" />
          <span style={{ marginLeft: 5 }}>Back</span>
        </Link>
      </div>
      <div className={s.detailsContainer}>
        <figure className={s.imgContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          />
        </figure>
        <div className={s.detailsInfoBox}>
          <h2>
            {`${movieDetails.original_title} ${
              movieDetails.release_date
                ? `(${getYearFromDate(movieDetails.release_date)})`
                : ""
            }`}
          </h2>

          <p>User score: {getVotePercent(movieDetails.vote_average)}</p>
          <h3>Overview</h3>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          <p>{movieDetails.genres?.map((item) => item.name + " ")}</p>
        </div>
      </div>

      <Divider style={{ marginTop: 20 }} />

      <ul className={s.addInfoList}>
        <li className={s.addInfoListItem}>
          <Link to="cast" state={{ from: backLinkHref }}>
            Cast
          </Link>
        </li>
        <li className={s.addInfoListItem}>
          <Link to="reviews" state={{ from: backLinkHref }}>
            Reviews
          </Link>
        </li>
      </ul>

      <Outlet />
    </>
  );
};

export default MovieDetails;
