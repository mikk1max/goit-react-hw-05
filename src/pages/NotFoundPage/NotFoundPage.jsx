import { useNavigate } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1 className={s.title}>404</h1>
        <p
          className={s.subtitle}
        >{`Oops! The page you're looking for doesn't exist.`}</p>
        <button className={s.button} onClick={() => navigate("/", {replace: true})}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
