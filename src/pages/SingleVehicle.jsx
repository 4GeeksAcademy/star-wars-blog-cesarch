import useGlobalReducer from "../hooks/useGlobalReducer";
import { SinglePageVehicle } from "../components/SinglePageVehicle";

export const SingleVehicle = () => {
    const {store, dispatch} =useGlobalReducer()
    return (
        <div className="text-center mt-5">
            <SinglePageVehicle />
        </div>
    )
}