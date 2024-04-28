import styles from "../../css/housing_selection/house_selection.module.css";
import DormCard from "./dorm_card.jsx";
import PropTypes from "prop-types";

function GalleryView({dorms,selectedDormId,showInfoOnClick,handleDormClick, clickedDorms}){
    return(
        dorms.length > 0 ? (
                        <div className={styles.dormCardContainer}>
                            {dorms.map((dorm, index) => (
                                <DormCard
                                    key={index}
                                    name={"Card " + index}
                                    dorm={dorm}
                                    showInfo={selectedDormId.includes(dorm.id)} // Show info only if selectedDormId matches dorm's ID
                                    showInfoOnClick={() => showInfoOnClick(dorm.id)}
                                    handleDormClick={() => handleDormClick(dorm)} // Call handleDormClick on dorm click
                                    clickedDorms={clickedDorms}
                                />
                            ))}
                        </div>
                    ) : (
                        <h1 className={styles.noDormMatch}>NO DORM MATCH</h1>
                    )
    )
}

GalleryView.propTypes = {
    dorms: PropTypes.array.isRequired,
    selectedDormId: PropTypes.array.isRequired,
    showInfoOnClick: PropTypes.func.isRequired,
    handleDormClick: PropTypes.func.isRequired,
    clickedDorms: PropTypes.array.isRequired,
};

export default GalleryView;