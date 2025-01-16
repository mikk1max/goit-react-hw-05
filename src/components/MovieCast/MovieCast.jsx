import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMovieCasts } from "../../service/api";
import { getIdFromLocation } from "../../service/helpers";

import s from "./MovieCast.module.css";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const location = useLocation();
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const movieId = getIdFromLocation(location);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieCasts(movieId);
        setCasts(data.cast || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.castContainer}>
          {casts.length > 0 ? (
            casts.map((item) => (
              <div key={item.cast_id || item.id} className={s.castCard}>
                <div className={s.castImg}>
                  <img
                    alt={item?.name || "Unknown Actor"}
                    src={
                      item?.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                        : "/no-image.png"
                    }
                  />
                </div>
                <div className={s.castInfoBox}>
                  <b
                    style={{ fontSize: 18, textAlign: "center" }}
                    className={s.castName}
                  >
                    {item?.name || "Unknown Name"}
                  </b>
                  <p className={s.castCharacter}>
                    <b>Character: </b>
                    {item?.character || "Unknown Character"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>{`We don't have any cast information for this movie.`}</p>
          )}
        </div>
      )}
    </>
  );
};

export default MovieCast;
