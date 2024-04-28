import PropTypes from 'prop-types';
import { useState} from "react";
import CheckboxFilter from "./CheckboxFilter.jsx";
import FilterStyles from "../../css/housing_selection/FilterStyles.module.css";
import SliderFilter from "./SliderFilter.jsx";

function FiltersPanel({ filters, setFilters,DisplayView }) {
    // Testing Purposes
    // useEffect(() => {
    //     console.log("Filters:");
    //     console.log(JSON.stringify(filters, null, 2));
    // }, [filters]);
    const [isMapView, setIsMapView] = useState(false)


    const handleSliderChange = (attribute, value) => {
        updateDisplayView()
        if(!isMapView) {
            setFilters({...filters, [attribute]: value});
        }
    };

    const handleCheckboxChange = (attribute, value, action) => {
        updateDisplayView()
        if(!isMapView) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [attribute]: action === "add" // if action is add, value added to attribute, otherwise remove
                    ? [...prevFilters[attribute], value]
                    : prevFilters[attribute].filter(item => item !== value)
            }));
        }
    };
    function updateDisplayView(){
        console.log(DisplayView)
         if(DisplayView === "MapView"){
         setIsMapView(true)
        }
         else{
             setIsMapView(false)
         }
    }


    const dormTypeFilter = ["Apartment Community", "Residence Community"];
    const amenitiesFilter = ["Kitchen","Personal Bathroom","Pool","Climate Control","Furnished","Ethernet"];
    const groupExclusiveFilter = ["Pharmacy-Only", "Freshman-Only","International-Only","Honors-Only","2nd Year+"];

    return(
        <div className={FilterStyles.filtersPanel}>
            <div><h3  className={FilterStyles.FiltersPanelTitle}>Filters</h3></div>
            <div>

                <SliderFilter
                    name="Semester Rate" idName="semesterRate"
                    min="0" max="10000" changeSlideValue={(value) => handleSliderChange("semesterRate", value)} preset = "$"
                />
            </div>
            <div>
                <SliderFilter
                    name="Meal Plan Range" idName="mealPlanRange"
                    min="7" max="21" changeSlideValue={(value) => handleSliderChange("mealPlan", value)} preset = ""
                />
            </div>
            <div>
                <CheckboxFilter
                    name="Dorm Type" idName="dormType" list ={dormTypeFilter}
                    addFilter={(value) => handleCheckboxChange("dormType", value, "add")}
                    removeFilter={(value) => handleCheckboxChange("dormType", value, "remove")}
                />
            </div>
            <div>
                <CheckboxFilter
                    name="Amenities" idName="amenities" list ={amenitiesFilter}
                    addFilter={(value) => handleCheckboxChange("amenities", value, "add")}
                    removeFilter={(value) => handleCheckboxChange("amenities", value, "remove")}
                />
            </div>
            <div>
                <CheckboxFilter
                    name="Group-Exclusive Dorms" idName="groupDorms" list ={groupExclusiveFilter}
                    addFilter={(value) => handleCheckboxChange("groupExclusive", value, "add")}
                    removeFilter={(value) => handleCheckboxChange("groupExclusive", value, "remove")}
                />
            </div>
        </div>
    )
}

FiltersPanel.propTypes = {
    filters: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    DisplayView: PropTypes.string.isRequired
};

export default FiltersPanel;
