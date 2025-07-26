import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Characters = () => {

    const [characters,setCharacters] = useState([])

    useEffect(() => {
        getCharacters()
    }, [])
  
  const getCharacters = async () => {
        const characters = "https://www.swapi.tech/api/people?page=1&limit=10"
        try {
            const response = await fetch(characters)
            const data = await response.json()
            
            const characterPropperties = await Promise.all(
                data.results.map(async (person) => {
                    const response = await fetch(person.url)
                    const data = await response.json()
                    return data.result.properties
                })
            )

            setCharacters(characterPropperties)
        } catch (error) {
            console.error(error.message)
        }
  }

  const grouped = groupCharacters(characters, 5);

  return (
    <div className="container mt-4">
      <h3 className="text-light">Characters</h3>

      <div id="cardCarousel" className="carousel slide" data-bs-ride="false">
        <div className="carousel-inner">
          {grouped.map((group, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div className="d-flex justify-content-center">
                {group.map((item, i) => (
                  <div className="card mx-2" style={{ width: "800px", height: "400px" }} key={i}>
                    <img src={rigoImageUrl} alt="" className="card-img-top" />
                    <div className="card-body">
                      <h5 className="d-flex card-title">{item.name}</h5>
                      <p className="d-flex card-text">Eye color: {item.eye_color}</p>
                      <p className="d-flex card-text">Hair color: {item.hair_color}</p>
                      <p className="d-flex card-text">Gender: {item.gender}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#cardCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#cardCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};
function groupCharacters(arr, size) {
  return arr.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);
}