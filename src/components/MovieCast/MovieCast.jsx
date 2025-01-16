import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMovieCasts } from "../../service/api";
import { getIdFromLocation } from "../../service/helpers";

import s from "./MovieCast.module.css";

const MovieCast = () => {
  const location = useLocation();
  const [casts, setCasts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieCasts(+getIdFromLocation(location));
        setCasts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location]);

  return (
    <>
      <div className={s.castContainer}>
        {casts.cast?.map((item, index) => (
          <div key={index} className={s.castCard}>
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
        ))}
      </div>
    </>
  );
};

export default MovieCast;
