import useGlobalReducer from "../hooks/useGlobalReducer";
import { SinglePageCharacter } from "../components/SinglePageCharacter";

export const SingleCharacter = () => {
    const {store, dispatch} =useGlobalReducer()
    
        return (
            <div className="text-center mt-5">
                <SinglePageCharacter />
            </div>
        );
}