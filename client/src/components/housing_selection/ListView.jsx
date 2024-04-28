import PropTypes from "prop-types";
import ListCard from "./ListCard.jsx";
import styles from "../../css/housing_selection/house_selection.module.css";
import DormCard from "./dorm_card.jsx";
import ListCardStyle from "../../css/housing_selection/ListCardStyle.module.css";

function ListView({dorms,selectedDormId,showInfoOnClick,handleDormClick, selectAll, prevState}){
    return(
        <>
            {dorms.length > 0 ? (
                <div className={styles.dormCardContainerList}>
                        {dorms.map((dorm, index) => (
                            <ListCard
                                key={index}
                                name={"Card_" + index}
                                dorm={dorm}
                                showInfo={selectedDormId.includes(dorm.id)} // Show info only if selectedDormId matches dorm's ID
                                showInfoOnClick={() => showInfoOnClick(dorm.id)}
                                handleDormClick={() => handleDormClick(dorm)} // Call handleDormClick on dorm click
                                selectAll={selectAll}
                                prevState={prevState}
                            />
                        ))}
                </div>
                ) : (
                    <h1 className={styles.noDormMatch}>NO DORM MATCH THE GIVEN FILTERS</h1>
            )}
        </>
    )
}


ListView.propTypes ={
    dorms: PropTypes.array.isRequired, // Validate dorms as an array
    selectedDormId: PropTypes.array.isRequired, // Validate selectedDormId as an array
    showInfoOnClick: PropTypes.func.isRequired, // Validate showInfoOnClick as a function
    handleDormClick: PropTypes.func.isRequired,
    selectAll: PropTypes.bool.isRequired,
    prevState: PropTypes.bool.isRequired
}
export default ListView;

