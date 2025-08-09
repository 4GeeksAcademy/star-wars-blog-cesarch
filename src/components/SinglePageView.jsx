import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const SinglePageView = () => {
  const {uid} = useParams()
  const [planet,setPlanet] = useState(null)


  const getDetail = async () =>{
    const detailPlanet = `https://www.swapi.tech/api/planets/${uid}`

    try{
      const response = await fetch(detailPlanet)
      const data = await response.json()

      setPlanet(data.result.properties)
    }catch(error){
      console.error(error.message)
    }
  }

  useEffect(()=>{
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
          <h3>{planet?.name}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Duis ut neque elit. Ut vestibulum orci sit amet posuere pharetra. 
            Aenean ut porta neque. Duis molestie vitae felis eget fermentum. 
            Nullam dictum, purus vel maximus finibus, est lacus sollicitudin risus, at pellentesque purus lectus at mauris.
            </p>
        </div>
      </div>
      <div className="row justify-content-between my-3 text-center">
        <div className="col-2 bg-danger border-dark">Name: {planet?.name}</div>
        <div className="col-2 bg-danger border-dark">Climate: {planet?.climate}</div>
        <div className="col-2 bg-danger border-dark">Terrain: {planet?.terrain}</div>
        <div className="col-2 bg-danger border-dark">Population: {planet?.population}</div>
        <div className="col-2 bg-danger border-dark">Gravity: {planet?.gravity}</div>
        <div className="col-2 bg-danger border-dark">Diameter: {planet?.diameter}</div>
      </div>
    </div>
  );
};
