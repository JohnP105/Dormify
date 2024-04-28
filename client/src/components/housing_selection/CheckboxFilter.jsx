import PropTypes from "prop-types";
import MinimizeFilter from "./MinimizeFilter.jsx";
import FilterStyles from "../../css/housing_selection/FilterStyles.module.css";

function CheckboxFilter(props) {
    /* List of filters for amenities and map it to check boxes */
    const Filters = props.list.map((item, index) => (
        <div key={index}
            className={`${FilterStyles.generalFiltersIndividualCheckboxes} ${props.idName}
            _FiltersIndividualCheckboxes`}
            data-testid={props.name + index}
        >
            <input
                type="checkbox" id={`checkbox-${index}`} tabIndex={index} className={props.idName+ "button_FiltersIndividualCheckboxes"}
                onChange={(event) => {
                    if (event.target.checked) {
                        props.addFilter(item); // Call addFilter function when checkbox is checked
                    } else {
                        props.removeFilter(item); // Call removeFilter function when checkbox is unchecked
                    }
                }}
            ></input>
            <label className={`${FilterStyles.checkboxFilterName} ${props.idName}_FiltersIndividualCheckboxes`}>{item}</label>
        </div>
    ));

    const ShowMore = () => {
        if (Filters.length >= 6) {
            return (
                <span className={props.idName + "_FiltersIndividualCheckboxes"} data-testid={""}>
                    <p className={FilterStyles.showMore}>Show more</p>
                </span>
            );
        } else {
            return null;
        }
    };

    return (
        <div className={FilterStyles.checkboxFilter}>
            <MinimizeFilter name={props.name} Idname={props.idName} minimizeId="_FiltersIndividualCheckboxes" />
            <div>
                {Filters}
                {/*{ShowMore()}*/}
            </div>
        </div>
    );
}

// Prop type validation for CheckboxFilter component
CheckboxFilter.propTypes = {
    list: PropTypes.array.isRequired, // Require list prop to be an array and is required
    name: PropTypes.string.isRequired, // Require name prop to be a string and is required
    idName: PropTypes.string.isRequired, // Require idName prop to be a string and is required
    addFilter: PropTypes.func.isRequired, // Require addFilter prop to be a function
    removeFilter: PropTypes.func.isRequired // Require removeFilter prop to be a function
};

export default CheckboxFilter;
