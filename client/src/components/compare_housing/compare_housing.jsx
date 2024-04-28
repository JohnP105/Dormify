import PropTypes from "prop-types";
import {dormFloorPlan, dormImg, dormMapView, inDormPictures} from "./dorm_pictures.jsx";
import "../../css/compare_housing.css";
import { useState } from "react";
import CompareGIF from "../../assets/no_dorm_img/ComparisonHousingGuide.gif"

function DormProperty({ title, value }) {
    let tempVal = value;
    if (value === "false" || value === "true") {
        tempVal = (value ? "Yes" : "No");
    }

    return (
        <div>
            <h6 style={{ paddingBottom: "0.25rem", fontWeight: "bolder" }}>{title}</h6>
            <p style={{ fontSize: "0.8rem" }}>
                {tempVal.charAt(0).toUpperCase() + tempVal.slice(1)}
            </p>
            <div className="line"></div>
        </div>
    );
}

DormProperty.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

function DormImage({ title, src, alt }) {
    return (
        <div className="dorm-img">
            <h6 style={{ paddingBottom: "0.25rem", fontWeight: "bold", color: "#333" }}>{title}</h6>
            <img src={src} alt={alt} />
            <div className="line"></div>
        </div>
    );
}

DormImage.propTypes = {
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

function RoomPictures({ title, alt, dormName }) {
    const firstWord = dormName.split(" ")[0]; // Split the dormName by space and get the first element
    const getSrc = () => {
        switch (firstWord) {
            case "Calaveras":
            case "Grace":
            case "Townhouse":
            case "Southwest":
            case "McCaffrey":
                return inDormPictures[firstWord];
            case "Chan":
            case "Monagan":
                return inDormPictures["Monagan"];
            default:
                return inDormPictures["Quads"];
        }
    };
    const src = getSrc();


    // Apply randomization on the starting pictures so every dorm won't have the same picture
    const [indexNumber, setIndexNumber] = useState(Math.floor(Math.random() * src.length));
    return (
        <div className="dorm-img">
            <h6 style={{ paddingBottom: "0.25rem", fontWeight: "bolder" }}>{title}</h6>
            <img src={src[indexNumber]} alt={alt} />
            <br />
            <button
                className={"arrow Left"}
                onClick={() => setIndexNumber((indexNumber + 1) % src.length)}></button>
            <button
                className={"arrow Right"}
                onClick={() => setIndexNumber((indexNumber + src.length - 1) % src.length)}></button>
            <div className="line"></div>
        </div>
    );
}

RoomPictures.propTypes = {
    title: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    dormName: PropTypes.string.isRequired,
};

function DormURL({ title, value }) {
    return (
        <div style={{overflowX: "auto", overflow:"hidden"}}>
            <h6 style={{ paddingBottom: "0.25rem", fontWeight: "bolder" }}>{title}</h6>
            <a
                href={value} target="_blank" rel="noopener noreferrer"
                style={{color:"blue"}}>{value}</a>
            <div className="line"></div>
        </div>
    );
}

DormURL.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

function HousingCompareCard({dorm, cardIndex, maxSelected}) {
    console.log(dorm)
    const getDormInfo = (dormName, infoType) => {
        const firstWord = dormName.split(" ")[0]; // Split the dormName by space and get the first element
        switch (firstWord) {
            case "Casa":
                if (dormName.split(" ")[1] === "Jackson") {
                    return infoType === "image" ? dormImg["Casa_Jackson"] : dormMapView["Casa_Jackson"];
                }
                return infoType === "image" ? dormImg["Casa_Werner"] : dormMapView["Casa_Werner"];
            default:
                return infoType === "image" ? dormImg[firstWord] : dormMapView[firstWord];
        }
    };

    return (
        <>
            <div className={`dorm-list ${maxSelected ? 'maxSelected' : ''}`} key={cardIndex}>
                <div className="house-img" style={{paddingBottom: 0}}>
                    <img src={getDormInfo(dorm.name, "image")} alt="House View"/>
                    <h4
                        className="name"
                        style={{fontWeight: "bolder", margin: "0.25rem 0 0.5rem 0"}}
                    >
                        {dorm.name}
                    </h4>
                    <div
                        style={{borderBottom: "3px solid black", marginBottom: "0.5rem"}}
                    ></div>
                </div>
                <DormProperty title="Type" value={dorm.type}/>
                <DormProperty title="Semester Rate" value={'$' + String(dorm.semester_rate)}/>
                <DormProperty title="Meal Plan" value={String(dorm.meal_plan)}/>
                <DormProperty title="Group Exclusion" value={dorm.group_exclusion}/>
                <DormProperty title="Kitchen?" value={String(dorm.kitchen)}/>
                <DormProperty title="Furnished?" value={String(dorm.furnished)}/>
                <DormProperty title="Pool?" value={String(dorm.pool)}/>
                <DormProperty title="Bathroom?" value={String(dorm.personal_bathroom)}/>
                <DormProperty title="Climate Control?" value={String(dorm.climate_control)}/>
                <DormProperty title="Ethernet?" value={String(dorm.ethernet)}/>
                <div
                    style={{borderBottom: "3px dashed black", marginBottom: "0.5rem"}}
                ></div>
                <DormProperty title="Map Location" value={dorm.map_location}/>
                <DormImage title="Map View" src={getDormInfo(dorm.name, "map view")} alt={"Map View"}/>
                <DormImage title="Floor Plan" src={dormFloorPlan[dorm.name]} alt={"Floor Plan"}/>
                <RoomPictures
                    className={cardIndex + "RoomPicture"}
                    title="Room Pictures"
                    alt={"Room Pictures"}
                    dormName={dorm.name}
                    indexNumber={0}
                />

                <DormURL title="CLICK FOR MORE INFO" value={dorm.info}/>
            </div>
        </>
    )
}

HousingCompareCard.propTypes = {
    dorm: PropTypes.object.isRequired,
    cardIndex: PropTypes.number.isRequired,
    maxSelected: PropTypes.bool.isRequired
};

function CompareHousing({dorms, setPage}) {
    const maxSelected = dorms.length > 4; // Check if more than 4 dorms are selected

    return (
        <>
            <div className="dorms">
                { dorms.length > 0 ?
                    dorms.map(function (dorm, index) {
                        return (<HousingCompareCard dorm={dorm} cardIndex={index} maxSelected={maxSelected} key={index} />);
                    })
                    :
                    <div className={"missingDorms"}>
                        <h1>No Dorms To Compare</h1>
                        <p>To start comparing: </p>
                        <p>
                            1. Go to the <a href="#!" onClick={() => setPage("house_selection")}>Housing Selection</a> page.<br />
                            2. Click the dorms you want to compare.<br/>
                            3. Press the `Compare Selected` button.</p>
                        <img src={CompareGIF} alt={""}/>
                    </div>
                }
            </div>
        </>
    );
}

CompareHousing.propTypes = {
    dorms: PropTypes.array.isRequired,
    setPage: PropTypes.func.isRequired
};

export default CompareHousing;