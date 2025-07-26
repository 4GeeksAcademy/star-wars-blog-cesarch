import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg"


export const Vehicles = () => {
    const [vehicles, setVehicles] = useState([])

    useEffect(() => {
        getVehicles()
    }, [])

    const getVehicles = async () => {
        const vehiclesUrl = "https://www.swapi.tech/api/vehicles?page=1&limit=10"
        try{
        const response = await fetch(vehiclesUrl)
        const data = await response.json()

        const vechiclesPropperties = await Promise.all(
            data.results.map(async(vehicles) =>{
                const response = await fetch(vehicles.url)
                const data = await response.json()
                return data.result.properties 
            })
        )

        setVehicles(vechiclesPropperties)
        }catch(error){
            console.error(error.message)
        }
    }

    const grouped = groupVehicles(vehicles, 5)

    return (
        <div className="container mt-4">
          <h3 className="text-light">Vehicles</h3>
    
          <div id="cardCarousel3" className="carousel slide" data-bs-ride="false">
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
                          <p className="d-flex card-text">Vehicle Model: {item.model}</p>
                          <p className="d-flex card-text">Vehicle Class: {item.vehicle_class}</p>
                          <p className="d-flex card-text">Vehicle Price: {item.cost_in_credits}</p>
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
              data-bs-target="#cardCarousel3"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#cardCarousel3"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>
)
}
function groupVehicles(arr,size) {
    return arr.reduce((acc, _, i) => {
        if (i % size === 0) acc.push(arr.slice(i, i + size))
        return acc
    }, [])
}