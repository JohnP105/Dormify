import PropTypes from "prop-types";
import MinimizeFilter from "./MinimizeFilter.jsx";
import FilterStyles from "../../css/housing_selection/FilterStyles.module.css";

function SliderFilter(props) {
    const updateCenterValue = () => {

        const centerValue = document.querySelector(`.${props.idName}_rightValue`);
        const currentSlider = document.getElementById(`${props.idName}_volume`);
        centerValue.innerHTML = props.preset + currentSlider.value;
    };

    return (
        <div>
            <MinimizeFilter
                name={props.name}
                Idname={props.idName}
                minimizeId="_FiltersSlideBar"
            />

            <div
                className={`${props.idName}_FiltersSlideBar ${FilterStyles.filtersPanelField}`}
                data-testid={props.name + " SliderDiv"}
            >
                <div>
                    <span className={FilterStyles.sliderLeftText}>
                        {props.preset + props.min}
                    </span>

                    <span
                        className={`${props.idName}_rightValue ${
                            FilterStyles.sliderRightText
                        }`}
                    >
                        {props.preset+ props.max}
                    </span>
                </div>
                <br/>
                <div></div>
                <div>
                    <input
                        className={FilterStyles.sliders}
                        type="range"
                        id={`${props.idName}_volume`}
                        min={props.min}
                        max={props.max}
                        defaultValue={props.max}
                        onChange={() => {
                            updateCenterValue();
                        }}
                        onMouseUp={(event) => {
                        props.changeSlideValue(event.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

// Prop type validation for SliderFilter component
SliderFilter.propTypes = {
    name: PropTypes.string.isRequired, // Require name prop to be a string and is required
    idName: PropTypes.string.isRequired, // Require Idname prop to be a string and is required
    min: PropTypes.string.isRequired, // Require min prop to be a number and is required
    max: PropTypes.string.isRequired, // Require max prop to be a number and is required
    changeSlideValue: PropTypes.func.isRequired, // Require changeSemesterRate prop to be a function and is required
    preset: PropTypes.string.isRequired
};

export default SliderFilter;
