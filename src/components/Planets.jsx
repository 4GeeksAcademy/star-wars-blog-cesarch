import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Planets = () => {
    const [planets,setPlanets] = useState([])

    useEffect(() =>{
        getPlanets()
    }, [])

    const getPlanets = async () => {
        const planets = "https://www.swapi.tech/api/planets?page=1&limit=10"
        try {
            const response = await fetch (planets)
            const data = await response.json()

            const planetsProperties = await Promise.all(
                data.results.map(async (plganet) => {
                    const response = await fetch(planet.url)
                    const data = await response.json()
                    return data.result.properties
                })
            )

            setPlanets(planetsProperties)
        } catch(error){
            console.error(error.message)
        }
    }

    const grouped = groupPlanets(planets,5)




return (
    <div className="container mt-4">
          <h3 className="text-light">Planets</h3>
    
          <div id="cardCarousel2" className="carousel slide" data-bs-ride="false">
            <div className="carousel-inner">
              {grouped.map((group, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <div className="d-flex justify-content-center">
                    {group.map((item, i) => (
                      <div className="card mx-2" style={{ width: "800px", height: "500px" }} key={i}>
                        <img src={rigoImageUrl} alt="" className="card-img-top" />
                        <div className="card-body">
                          <h5 className="d-flex card-title">{item.name}</h5>
                          <p className="d-flex card-text">Planet Climate: {item.climate}</p>
                          <p className="d-flex card-text">Planet Terrain: {item.terrain}</p>
                          <p className="d-flex card-text">Planet Population: {item.population}</p>
                          <div className="container-fluid d-flex">
                          <button type="button" className="btn btn-dark text-light">Learn More!</button>
                          <button type="button" className="btn btn-dark text-light ms-2"><i className="fa-solid fa-heart"></i></button>
                        </div>
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
              data-bs-target="#cardCarousel2"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#cardCarousel2"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
)
}
function groupPlanets(arr,size) {
    return arr.reduce((acc, _, i) => {
        if (i % size === 0) acc.push(arr.slice(i, i + size))
        return acc
    }, [])
}