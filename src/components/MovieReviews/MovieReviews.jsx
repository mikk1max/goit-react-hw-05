import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMovieReviews } from "../../service/api";
import { formatDate, getIdFromLocation } from "../../service/helpers";

import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const location = useLocation();
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieReviews(+getIdFromLocation(location));
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location]);

  return (
    <ul className={s.reviewsList}>
      {reviews?.total_results > 0 &&
        reviews?.results.map((item) => (
          <li key={item?.id} className={s.reviewsItem}>
            <div className={s.reviewsItemImg}>
              <img
                src={
                  item?.author_details.avatar_path
                    ? `https://media.themoviedb.org/t/p/w150_and_h150_face${item.author_details.avatar_path}`
                    : "/no-image.png"
                }
                alt={item.author_details.name || item.author_details.username}
              />
            </div>
            <div className={s.reviewsTextBox}>
              <p>{item.author_details.username}</p>
              <p>{item.content}</p>
              <p>
                {item.updated_at
                  ? formatDate(item.updated_at)
                  : formatDate(item.created_at)}
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default MovieReviews;
