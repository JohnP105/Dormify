
import FilterStyles from "../../css/housing_selection/FilterStyles.module.css";
import PropTypes from "prop-types";
import CheckboxFilter from "./CheckboxFilter.jsx";
function MinimizeFilter(props){

    const elements = document.getElementsByClassName(props.Idname + props.minimizeId);
    const elements3 = document.getElementsByClassName(props.Idname+"button" + props.minimizeId)
    const element2 = document.getElementsByClassName(props.Idname+props.minimizeId+"Button");


     function hideFiltersPanel() {
        if( elements[0].style.display !== "none") {
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
                if(props.minimizeId !== "_FiltersSlideBar") {
                    elements3[i].style.display = "none";
                }
            }
            element2[0].innerHTML = "+"
        }
        else{
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = "initial";
                if(props.minimizeId !== "_FiltersSlideBar") {
                    elements3[i].style.display = "initial";
                }
            }
            element2[0].innerHTML =  "-"
        }
    }

return (
    <h3>
        <span className={FilterStyles.checkboxFilterTitle}>{props.name}</span>
        <span style={{ cursor: 'pointer' }} onClick={hideFiltersPanel} className={`${FilterStyles.hideFiltersPanelMinimize} ${props.Idname+props.minimizeId+"Button"}`} data-testid={props.name+"MinimizeButton"}>-</span>
    </h3>
)
}
MinimizeFilter.propTypes = {
    name: PropTypes.string.isRequired, // name prop is required and should be a string
    Idname: PropTypes.string.isRequired, // Idname prop is required and should be a string
    minimizeId: PropTypes.string.isRequired // minimizeId prop is required and should be a string
};

export default MinimizeFilter;