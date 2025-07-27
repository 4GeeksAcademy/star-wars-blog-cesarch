import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { SinglePageView } from "../components/SinglePageView.jsx";

export const SinglePage = () => {

  const {store, dispatch} =useGlobalReducer()

    return (
        <div className="text-center mt-5">
            <SinglePageView />
        </div>
    );
}; 