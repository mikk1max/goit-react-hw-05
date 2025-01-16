import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  const addActive = ({ isActive }) => (isActive ? s.active : s.nonActive);

  return (
    <header className={s.header}>
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
    </header>
  );
};

export default Header;
