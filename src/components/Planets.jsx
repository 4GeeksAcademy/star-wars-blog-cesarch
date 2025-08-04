import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { useFavorites } from "./FavoriteList";

export const Planets = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    getPlanets();
  }, []);

  const getPlanets = async () => {
    const planets = "https://www.swapi.tech/api/planets?page=1&limit=10";
    try {
      const response = await fetch(planets);
      const data = await response.json();

      const planetsProperties = await Promise.all(
        data.results.map(async (planet) => {
          const response = await fetch(planet.url);
          const data = await response.json();
          return {
            ...data.result.properties,
            uid: planet.uid,
          };
        })
      );

      setPlanets(planetsProperties);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-light">Planets</h3>

      <div className="d-flex overflow-auto gap-3 py-3">
        {planets.map((item, i) => (
          <div className="card" style={{ minWidth: "18rem" }} key={i}>
            <img src={rigoImageUrl} alt="" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Climate: {item.climate}</p>
              <p className="card-text">Terrain: {item.terrain}</p>
              <p className="card-text">Population: {item.population}</p>
              <div className="d-flex justify-content-between mx-5">
                <Link to={`/singleplanet/${item.uid}`}>
                  <button className="btn btn-dark btn">Learn More</button>
                </Link>
                <button
                  className="btn btn-dark btn"
                  onClick={() =>
                    isFavorite(item.uid, "planet")
                      ? removeFavorite(item.uid, "planet")
                      : addFavorite({...item, type: "planet"})
                  }
                >
                  <i
                    className={`fa-${
                      isFavorite(item.uid, "planet") ? "solid" : "regular"
                    } fa-heart`}
                  ></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
