import { Link } from "react-router-dom";
import { useFavorites } from "./FavoriteList";

export const Navbar = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1 text-light">
            <i className="fa-solid fa-jedi"></i>
          </span>
        </Link>
        <div className="ml-auto dropdown">
          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites <span className="badge bg-dark">{favorites.length}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {favorites.length === 0 ? (
              <li className="dropdown-item text-muted">No favorites</li>
            ) : (
              favorites.map((item, index) => (
                <li className="dropdown-item d-flex justify-content-between align-items-center" key={index}>
                  <span>{item.name}</span>
                  <button
                    className="btn btn-sm btn-outline-danger ms-1"
                    onClick={() => removeFavorite(item.uid, item.type)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};