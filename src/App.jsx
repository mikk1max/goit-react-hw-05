import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MovieReviews from "./components/MovieReviews/MovieReviews";

const Header = lazy(() => import("./components/Header/Header"));
const HomePage = lazy(() => import("./pages/Home/Home"));
const Movies = lazy(() => import("./pages/Movies/Movies"));
const MovieDetails = lazy(() => import("./components/MovieDetails/MovieDetails"))
const MovieCast = lazy(() =>  import("./components/MovieCast/MovieCast"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <>
      <Header />
      <div style={{ padding: "20px"}}>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<MovieCast />}/>
            <Route path="reviews" element={<MovieReviews />}/>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
