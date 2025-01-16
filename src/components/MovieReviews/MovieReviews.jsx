import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMovieReviews } from "../../service/api";
import { formatDate, getIdFromLocation } from "../../service/helpers";
import Loader from "../Loader/Loader";

import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const location = useLocation();
  const [reviews, setReviews] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const movieId = getIdFromLocation(location);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.log(error);
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
        <ul className={s.reviewsList}>
          {reviews?.total_results > 0 ? (
            reviews?.results.map((item) => (
              <li key={item?.id} className={s.reviewsItem}>
                <div className={s.reviewsItemImg}>
                  <img
                    src={
                      item?.author_details.avatar_path
                        ? `https://media.themoviedb.org/t/p/w150_and_h150_face${item.author_details.avatar_path}`
                        : "/no-image.png"
                    }
                    alt={
                      item.author_details.name || item.author_details.username
                    }
                  />
                </div>
                <div className={s.reviewsTextBox}>
                  <p>{item.author_details.username}</p>
                  <p>{item.content}</p>
                  <p
                    style={{ color: "#003580", fontWeight: 600, marginTop: 15 }}
                  >
                    {item.updated_at
                      ? formatDate(item.updated_at)
                      : formatDate(item.created_at)}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p>{`We don't have any reviews for this movie.`}</p>
          )}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
