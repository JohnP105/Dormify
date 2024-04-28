import PropTypes from "prop-types";
import ListCardStyle from "../../css/housing_selection/ListCardStyle.module.css"
import {useEffect, useState} from "react";
import {dormImg} from "../compare_housing/dorm_pictures.jsx";

function ListCard({ name, dorm, handleDormClick, selectAll, prevState}){
    const element = document.getElementsByClassName(name+"_additionalInfo");
    const element2 = document.getElementsByClassName(name+"bar");
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        setIsChecked(selectAll); // Update checkbox state based on isSelectedAll prop
    }, [prevState]);

    const dormClick = () => {
        setIsChecked(prev => !prev);
        handleDormClick(); // Call the onClick function passed from the parent component
    };

    const additionalInfoDisplay = () => {
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
        return(
            <div>
                {showAmenities()}
                <img src={getDormImg(dorm.name)} alt="Dorm Image" className={ListCardStyle.dormImage}/>
            </div>
        )
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
                <p key={key} className={ListCardStyle.amenity}>
                    {key}: {additionalInfo[key] ? "Yes" : "No"}
                </p>
            );
        }
        amenityElements.push(
            <p key="seeMore" className={ListCardStyle.amenity}>
                <a href={dorm.info} target="_blank">
                    See More
                </a>
            </p>
        );
        return amenityElements;
    };//weh

    function additionalInformation(){
        // console.log("burger")
        console.log(element[0].style.display)
        if(element[0].style.display === "none"){
            element[0].style.display = "initial"
            element2[0].style.borderBottomLeftRadius = "0px";
            element2[0].style.borderBottomRightRadius = "0px";
        }
        else{
            element[0].style.display = "none"
            element2[0].style.borderBottomLeftRadius = "20px";
            element2[0].style.borderBottomRightRadius = "20px";
        }
        dormClick()
    }

    return(
        <>
            <div className={`${ListCardStyle.ListCard} ${name}bar`} onClick={dormClick}>
                <div className={ListCardStyle.leftAlignContainer}>
                    <input type={"checkbox"} className={ListCardStyle.CheckBox} checked={isChecked} readOnly={true}
                           data-testid={`${name}-checkbox`}/>
                    <p className={ListCardStyle.dormName}>{dorm.name}</p>
                </div>
                <div className={ListCardStyle.rightAlignContainer}>
                    <p className={ListCardStyle.semesterRate}>${dorm.semester_rate} / semester</p>
                    <p className={ListCardStyle.dropDown} onClick={additionalInformation}>▼</p>
                </div>


            </div>
            <div className={`${ListCardStyle.ListCardInfo} ${name}_additionalInfo`} style={{display: "none"}}>
                {additionalInfoDisplay()}
            </div>
        </>
    )
}

ListCard.propTypes = {
    name: PropTypes.string.isRequired,
    dorm: PropTypes.object.isRequired,
    showInfo: PropTypes.bool.isRequired,
    showInfoOnClick: PropTypes.func.isRequired,
    handleDormClick: PropTypes.func.isRequired,
    selectAll: PropTypes.bool.isRequired,
    prevState: PropTypes.bool.isRequired
};

export default ListCard;