import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {dormImg} from "../compare_housing/dorm_pictures.jsx";
import dormStyles from "../../css/housing_selection/dorm_card.module.css"

function AdditionalInfoElements({ dorm, showInfo, showInfoOnClick }) {
    if (showInfo === false) {
        return (
            <>
                <p className={dormStyles.showInfo} onClick={showInfoOnClick}>▼ Additional Information:</p>
            </>
        );
    }

    const additionalInfo = {
        "Has Ethernet?": dorm.ethernet,
        "Has Kitchen?": dorm.kitchen,
        "Has Personal Bathroom?": dorm.personal_bathroom,
        "Has Pool?": dorm.pool,
        "Is Furnished?": dorm.furnished,
    };

    const showAmenities = () => {
        const amenityElements = [];
        for (let key in additionalInfo) {
            amenityElements.push(
                <p key={key} className={dormStyles.amenity}>
                    {key}: {additionalInfo[key] ? "Yes" : "No"}
                </p>
            );
        }
        amenityElements.push(
            <p key="seeMore" className={dormStyles.amenity}>
                <a href={dorm.info} target="_blank">
                    See More
                </a>
            </p>
        );
        return amenityElements;
    };

    return (
        <>
            <div>
                <p className={dormStyles.removeInfo} onClick={showInfoOnClick}>▲ Additional Information:</p>
                {showAmenities()}
            </div>
        </>
    );
}

// Prop type validation for AdditionalInfoElements component
AdditionalInfoElements.propTypes = {
    dorm: PropTypes.object.isRequired,
    showInfo: PropTypes.bool.isRequired,
    showInfoOnClick: PropTypes.func.isRequired,
};


function DormCard({ name, dorm, showInfo, showInfoOnClick, handleDormClick, clickedDorms}) {
    const [isChecked, setIsChecked] = useState(false);
    const getDormImg = (dormName) => {
        const firstWord = dormName.split(" ")[0]; // Split the dormName by space and get the first element
        switch (firstWord) {
            case "Casa":
                if (dormName.split(" ")[1] === "Jackson") {
                    return dormImg["Casa_Jackson"];
                }
                return dormImg["Casa_Werner"];
            default:
                return dormImg[firstWord];
        }
    };

    const checkSelected = () => {
        const dormIndex = clickedDorms.findIndex((item) => item.id === dorm.id);
        return dormIndex !== -1;
    }

    useEffect(() => {
        setIsChecked(checkSelected()); // Update checkbox state based on isSelectedAll prop
    }, [clickedDorms]);

    const dormClick = () => {
        setIsChecked(prev => !prev);
        handleDormClick(dorm); // Call the onClick function passed from the parent component with dorm object
    };

    return (
        <div className={dormStyles.card} data-testid={name} onClick={dormClick}>
            <input
                type="checkbox"
                checked={isChecked}
                readOnly={true}
                className={dormStyles.cardInput}
                data-testid={`${name}-checkbox`}
            />
            <img className={dormStyles.imgDorm} src={getDormImg(dorm.name)} alt="Dorm Image" />
            <div className={dormStyles.cardContent}>
                <h2>{dorm.name}</h2>
                <p>{dorm.type}</p>
                <p>Minimum Meal Plan: {dorm.meal_plan}</p>
                {dorm.group_exclusion !== "None" ? <p>{dorm.group_exclusion}</p> : <br/>}
                <br/>
                <AdditionalInfoElements
                    dorm={dorm}
                    showInfo={showInfo}
                    showInfoOnClick={showInfoOnClick}
                />
            </div>
            <div className={dormStyles.cardSemesterRates}>
                <p>${dorm.semester_rate} / semester</p>
            </div>
        </div>
    );
}

DormCard.propTypes = {
    name: PropTypes.string.isRequired,
    dorm: PropTypes.object.isRequired,
    showInfo: PropTypes.bool.isRequired,
    showInfoOnClick: PropTypes.func.isRequired,
    handleDormClick: PropTypes.func.isRequired,
    clickedDorms: PropTypes.array.isRequired
};


export default DormCard ;


