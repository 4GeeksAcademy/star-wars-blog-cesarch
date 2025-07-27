import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const SinglePageCharacter = () => {
    const {uid} = useParams()
    const [character, setCharacter] = useState(null)

    const getDetail = async() => {
        const detailCharacter = `https://www.swapi.tech/api/people/${uid}`

        try{
            const response = await fetch(detailCharacter)
            const data = await response.json()

        setCharacter(data.result.properties)
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
                  <h3>{character?.name}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Duis ut neque elit. Ut vestibulum orci sit amet posuere pharetra. 
                    Aenean ut porta neque. Duis molestie vitae felis eget fermentum. 
                    Nullam dictum, purus vel maximus finibus, est lacus sollicitudin risus, at pellentesque purus lectus at mauris.
                    </p>
                </div>
              </div>
              <div className="row justify-content-between my-3 text-center">
                <div className="col-2 bg-light border">{character?.name}</div>
                <div className="col-2 bg-danger border">{character?.eye_color}</div>
                <div className="col-2 bg-primary border">{character?.hair_color}</div>
                <div className="col-2 bg-light border">{character?.gender}</div>
                <div className="col-2 bg-light border">{character?.birth_year}</div>
                <div className="col-2 bg-light border">{character?.height}</div>
              </div>
            </div>
    )




}