import PropTypes from "prop-types";
import GalleryView from "./GalleryView.jsx";
import ListView from "./ListView.jsx";
import MapView from "./MapView.jsx";

function DisplayView({dorms,selectedDormId,showInfoOnClick,handleDormClick,Display, selectAll, prevState, clickedDorms}){

    const GView = () =>{
        return(
            <GalleryView
                showInfoOnClick={showInfoOnClick}
                selectedDormId={selectedDormId}
                handleDormClick={handleDormClick}
                dorms={dorms}
                clickedDorms={clickedDorms}
            />
        )
    }
    const LView = () =>{
        return(
            <ListView
                showInfoOnClick={showInfoOnClick}
                selectedDormId={selectedDormId}
                handleDormClick={handleDormClick}
                dorms={dorms}
                selectAll={selectAll}
                prevState={prevState}
            />
        )
    }
    const MView = () =>{
        return(
            <MapView
                showInfoOnClick={showInfoOnClick}
                selectedDormId={selectedDormId}
                handleDormClick={handleDormClick}
                dorms={dorms}
                clickedDorms={clickedDorms}
            />
        )
    }

    const renderView = () =>{
        switch (Display) {
            case 'GalleryView':
                return (GView());
            case 'ListView':
                return (LView());
            case 'MapView':
                return (MView())
            default:
                return (GView());
        }

    }
    return (
        renderView()

    )


}

DisplayView.propTypes = {
    dorms: PropTypes.array.isRequired,
    selectedDormId: PropTypes.array.isRequired,
    showInfoOnClick: PropTypes.func.isRequired,
    handleDormClick: PropTypes.func.isRequired,
    Display: PropTypes.string.isRequired,
    selectAll: PropTypes.bool.isRequired,
    prevState: PropTypes.bool.isRequired,
    clickedDorms: PropTypes.array.isRequired
};

export default DisplayView;