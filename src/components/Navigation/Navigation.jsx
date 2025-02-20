import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

export default function Navigation() {
  const addActive = ({ isActive }) => (isActive ? s.active : s.nonActive);

  return (
    <nav>
      <ul className={s.navList}>
        <li className={`${s.navListItem}`}>
          <NavLink to="/" className={addActive}>
            Home
          </NavLink>
        </li>
        <li className={`${s.navListItem}`}>
          <NavLink to="/movies" className={addActive}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
