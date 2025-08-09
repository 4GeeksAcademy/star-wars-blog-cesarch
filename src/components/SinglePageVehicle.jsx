import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const SinglePageVehicle = () => {
    const {uid} = useParams()
    const [vehicles, setVehicles] = useState(null)

    const getDetail = async() => {
        const detailvehicles = `https://www.swapi.tech/api/vehicles/${uid}`
        try{
            const response = await fetch(detailvehicles)
            const data = await response.json()

        setVehicles(data.result.properties)
        }catch(error){
            console.error(error.message)
        }
    }
    useEffect(() => {
        getDetail()
    }, []) 

    return (
            <div className="container text-center">
              <div className="row justify-content-center">
                <div
                  className="col-6 bg-light"
                >
                  <div>
                    <img src={rigoImageUrl} className="img-fluid" />
                  </div>
                </div>
                <div className="col-6 bg-dark text-light">
                  <h3>{vehicles?.name}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Duis ut neque elit. Ut vestibulum orci sit amet posuere pharetra. 
                    Aenean ut porta neque. Duis molestie vitae felis eget fermentum. 
                    Nullam dictum, purus vel maximus finibus, est lacus sollicitudin risus, at pellentesque purus lectus at mauris.
                    </p>
                </div>
              </div>
              <div className="row justify-content-between my-3 text-center">
                <div className="col-2 bg-danger border-black">Name: {vehicles?.name}</div>
                <div className="col-2 bg-danger border-black">Model: {vehicles?.model}</div>
                <div className="col-2 bg-primary border-black">Class: {vehicles?.vehicle_class}</div>
                <div className="col-2 bg-danger border-black">Price: {vehicles?.cost_in_credits}</div>
                <div className="col-2 bg-danger border-black">Passengers: {vehicles?.passengers}</div>
                <div className="col-2 bg-danger border-black">Manufacturer: {vehicles?.manufacturer}</div>
              </div>
            </div>
          );

}

