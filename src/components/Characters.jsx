import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { useFavorites } from "./FavoriteList";

export const Characters = () => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacters = async () => {
    const characters = "https://www.swapi.tech/api/people?page=1&limit=10";
    try {
      const response = await fetch(characters);
      const data = await response.json();

      const characterPropperties = await Promise.all(
        data.results.map(async (person) => {
          const response = await fetch(person.url);
          const data = await response.json();
          return {
            ...data.result.properties,
            uid: person.uid,
          };
        })
      );

      setCharacters(characterPropperties);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-light">Characters</h3>

      <div className="d-flex overflow-auto gap-3 py-3">
        {characters.map((item, i) => (
          <div className="card" style={{ minWidth: "18rem" }} key={i}>
            <img src={rigoImageUrl} alt="" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Eye color: {item.eye_color}</p>
              <p className="card-text">Hair color: {item.hair_color}</p>
              <p className="card-text">Gender: {item.gender}</p>
              <div className="d-flex justify-content-between mx-5">
                <Link to={`/singlecharacter/${item.uid}`}>
                  <button className="btn btn-dark">Learn More</button>
                </Link>
                <button
                  className="btn btn-dark ms-2"
                  onClick={() =>
                    isFavorite(item.uid, "character")
                      ? removeFavorite(item.uid, "character")
                      : addFavorite({...item, type: "character"})
                  }
                >
                  <i
                    className={`fa-${
                      isFavorite(item.uid, "character") ? "solid" : "regular"
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
