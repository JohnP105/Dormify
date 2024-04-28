import DormCard from "./dorm_card.jsx";
import PropTypes from "prop-types";
import MapStyle from "../../css/housing_selection/MapCardStyle.module.css"

function MapCard({dorm,index,selectedDormId,showInfoOnClick,handleDormClick, clickedDorms}){

    return(
        <div className={MapStyle.dormCard}>
            <DormCard
                key={index}
                name={"Card " + index}
                dorm={dorm}
                showInfo={selectedDormId.includes(dorm.id)} // Show info only if selectedDormId matches dorm's ID
                showInfoOnClick={() => showInfoOnClick(dorm.id)}
                handleDormClick={() => handleDormClick(dorm)} // Call handleDormClick on dorm click
                clickedDorms={clickedDorms}
            />
        </div>
    )
}

MapCard.propTypes = {
    dorm: PropTypes.object.isRequired,
    selectedDormId: PropTypes.array.isRequired,
    showInfoOnClick: PropTypes.func.isRequired,
    handleDormClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    clickedDorms: PropTypes.array.isRequired
};
export default MapCard;