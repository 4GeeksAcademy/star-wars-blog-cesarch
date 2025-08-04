import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { useFavorites } from "./FavoriteList";

export const Vehicles = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    const vehiclesUrl = "https://www.swapi.tech/api/vehicles?page=1&limit=10";
    try {
      const response = await fetch(vehiclesUrl);
      const data = await response.json();

      const vechiclesPropperties = await Promise.all(
        data.results.map(async (vehicles) => {
          const response = await fetch(vehicles.url);
          const data = await response.json();
          return {
            ...data.result.properties,
            uid: vehicles.uid,
          };
        })
      );

      setVehicles(vechiclesPropperties);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-light">Vehicles</h3>

      <div className="d-flex overflow-auto gap-3 py-3">
        {vehicles.map((item, i) => (
          <div
            className="card"
            style={{ minWidth: "18rem", width: "18rem" }}
            key={i}
          >
            <img src={rigoImageUrl} alt="" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Vehicle Model: {item.model}</p>
              <p className="card-text">Vehicle Class: {item.vehicle_class}</p>
              <p className="card-text">Vehicle Price: {item.cost_in_credits}</p>
              <div className="d-flex justify-content-between mx-5">
                <Link to={`/singlevehicle/${item.uid}`}>
                  <button className="btn btn-dark">Learn More</button>
                </Link>
                <button
                  className="btn btn-dark ms-2"
                  onClick={() =>
                    isFavorite(item.uid, "vehicle")
                      ? removeFavorite(item.uid, "vehicle")
                      : addFavorite({...item, type: "vehicle"})
                  }
                >
                  <i
                    className={`fa-${
                      isFavorite(item.uid, "vehicle") ? "solid" : "regular"
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
