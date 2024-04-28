import PropTypes from "prop-types";
import apartmentMap from "../../assets/ApartmentCommunity.png"
import residenceMap from "../../assets/ResidenceCommmunity.png"
import styles from "../../css/housing_selection/house_selection.module.css";
import MapCard from "./MapCard.jsx";
import {useEffect, useState} from "react";
import MapStyle from "../../css/housing_selection/MapCardStyle.module.css"
function MapView({dorms,selectedDormId,showInfoOnClick,handleDormClick, clickedDorms}) {
    const [index, setIndex] = useState(0)
    const [dorm, setDorm] = useState(dorms[index])
    const [mapIndex, setMapIndex] = useState(0)


    useEffect(() => {
        setDorm(dorms[index]);
    }, [index]);

    const nextImage = () => {
        setMapIndex((mapIndex + 1) % 2);
    }

    const chooseImage = (mapIndex) => {
        if (mapIndex === 0) {
            return (apartmentMap)
        } else {
            return (residenceMap)
        }
    }
    const mapClicked = (title) => {
        switch (title) {
            case("SouthWest"):
                setIndex(0)
                return;
            case("JessieB"):
                setIndex(1)
                return;
            case("Grace"):
                setIndex(2)
                return;
            case("McCaffery"):
                setIndex(3)
                return;
            case("Calaveras"):
                setIndex(4)
                return;
            case("Monagan"):
                setIndex(7)
                return;
            case("Chan"):
                setIndex(8)
                return;
            case("Townhouses"):
                setIndex(9)
                return;
            case("Carter"):
                setIndex(11)
                return;
            case("Jackson"):
                setIndex(12)
                return;
            case("Werner"):
                setIndex(13)
                return;
            case("Eiselen"):
                setIndex(14)
                return;
            case("Farley"):
                setIndex(15)
                return;
            case("JohnB"):
                setIndex(16)
                return;
            case("Price"):
                setIndex(17)
                return;
            case("Ritter"):
                setIndex(18)
                return;
            case("Wemyss"):
                setIndex(19)
                return;
        }
    }
    const clickableMap = () => {
        if (mapIndex === 0) {
            return (
                <map name={"map"}>
                    <area target="" alt="Townhouses" title="Townhouses" coords="13,123,85,359"
                          shape="rect" onClick={() => mapClicked("Townhouses")}
                          className={MapStyle.clickableMapElements}/>
                    <area target="" alt="Calaveras" title="Calaveras" coords="191,263,385,347"
                          shape="rect" onClick={() => mapClicked("Calaveras")}
                          className={MapStyle.clickableMapElements}/>
                    <area target="" alt="Monagan" title="Monagan" coords="459,27,572,103" shape="rect"
                          onClick={() => mapClicked("Monagan")}
                          className={MapStyle.clickableMapElements}/>
                    <area target="" alt="Chan" title="Chan" coords="579,27,687,104" shape="rect"
                          onClick={() => mapClicked("Chan")}
                          className={MapStyle.clickableMapElements}/>
                </map>

            )
        } else {
            return (
                <map name="image-map">
                    <area target="" alt="Grace" title="Grace" coords="458,87,582,156" shape="rect"
                          onClick={() => mapClicked("Grace")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="McCaffery" title="McCaffery" coords="323,157,401,215" shape="rect"
                          onClick={() => mapClicked("McCaffery")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="Carter" title="Carter" coords="69,186,117,211" shape="rect"
                          onClick={() => mapClicked("Carter")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="Jackson" title="Jackson" coords="135,308,154,345" shape="rect"
                          onClick={() => mapClicked("Jackson")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="Werner" title="Werner" coords="158,362,113,348" shape="rect"
                          onClick={() => mapClicked("Werner")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="Eiselen" title="Eiselen" coords="47,193,62,231" shape="rect"
                          onClick={() => mapClicked("Eiselen")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="Farley" title="Farley" coords="46,310,64,341" shape="rect"
                          onClick={() => mapClicked("Farley")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="JessieB" title="JessieB" coords="121,247,157,280" shape="rect"
                          onClick={() => mapClicked("JessieB")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="JohnB" title="JohnB" coords="156,222,121,183" shape="rect"
                          onClick={() => mapClicked("JohnB")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="Price" title="Price" coords="38,347,81,364" shape="rect"
                          onClick={() => mapClicked("Price")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="Ritter" title="Ritter" coords="42,254,77,267" shape="rect"
                          onClick={() => mapClicked("Ritter")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="Wemyss" title="Wemyss" coords="49,274,60,301" shape="rect"
                          onClick={() => mapClicked("Wemyss")} className={MapStyle.clickableMapElements}/>
                    <area target="" alt="SouthWest" title="SouthWest" coords="364,297,419,361" shape="rect"
                          onClick={() => mapClicked("SouthWest")} className={MapStyle.clickableMapElements}/>
                </map>
            )
        }
    }

    function whichMap(mapIndex) {
        if (mapIndex === 0) {
            return ("#map")
        }
        return ("#image-map")
    }

return (
    <div>
        {dorms.length > 0 ? (
            <div>
                <button onClick={nextImage} className={MapStyle.nextImageButton}>
                    Next
                </button>
                <div className={styles.dormCardContainerMap}>
                    <div>
                        <img
                            src={chooseImage(mapIndex)}
                            alt="Campus Map"
                            style={{border: "5px solid #000"}}
                            className={MapStyle.map}
                            useMap={whichMap(mapIndex)}
                        />
                        {clickableMap()}
                    </div>
                    <MapCard
                        dorm={dorm}
                        index={dorm.id}
                        selectedDormId={selectedDormId}
                        showInfoOnClick={showInfoOnClick}
                        handleDormClick={handleDormClick}
                        clickedDorms={clickedDorms}
                    />
                </div>
            </div>
        ) : (
            <h1 className={styles.noDormMatch}>NO DORM MATCH THE GIVEN FILTERS</h1>
        )}
    </div>
    );
}

MapView.propTypes = {
    dorms: PropTypes.array.isRequired, // Validate dorms as an array
    selectedDormId: PropTypes.array.isRequired, // Validate selectedDormId as an array
    showInfoOnClick: PropTypes.func.isRequired, // Validate showInfoOnClick as a function
    handleDormClick: PropTypes.func.isRequired,
    clickedDorms: PropTypes.array.isRequired
}

export default MapView;