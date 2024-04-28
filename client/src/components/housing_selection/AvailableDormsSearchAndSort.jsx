import AvailableStyles from "../../css/housing_selection/AvailableDormsStyles.module.css";
import PropTypes from "prop-types";
import {useState} from "react";

function AvailableDormsSearchAndSort({ setPage, setDorms, clickedDorms,sortByFormat,clearDormClick, selectAll, sortDorms}) {
    const [currentView,setCurrentView] = useState('galleryView')
    const handleChange = (event) =>{
        setCurrentView(event.target.value);
        sortByFormat(event.target.value);
        clearDormClick()
    }
    const handleCompareSelected = () => {
        setDorms(clickedDorms);
        setPage("compare_housing");
    };

    const handleSortingChange = (event) => {
        sortDorms(event.target.value);
    }

    return (
        <div className={AvailableStyles.AvailableDormsSearchAndSortDiv}>
            <div className={AvailableStyles.selection}>
                <div className={AvailableStyles.selection}>
                    <button className={`${AvailableStyles.selectionButton} ${AvailableStyles.resetButton}`}
                        onClick={clearDormClick}>
                        Reset
                    </button>
                    <button className={`${AvailableStyles.selectionButton} ${AvailableStyles.resetButton}`}
                        onClick={selectAll}>
                        Select All
                    </button>
                    <button className={`${AvailableStyles.selectionButton} ${AvailableStyles.compareButton}`}
                            onClick={handleCompareSelected}>
                        Compare Selected
                    </button>
                </div>
            </div>

            <div className={AvailableStyles.sortBy}>
                <div className={AvailableStyles.displayBox}>
                    <span className={AvailableStyles.sortByTitle}>Display</span>
                    <select name="sortByFormat" id="sortByFormat" className={AvailableStyles.sortByBoxes}
                            value={currentView}
                            onChange={handleChange}>
                        <option value="GalleryView">Gallery View</option>
                        <option value="ListView">List View</option>
                        <option value="MapView">Map View</option>
                    </select>
                </div>
                <div className={AvailableStyles.sortByBox}>
                    <span className={AvailableStyles.sortByTitle}>Sort By</span>
                    <select name="sortByFilters" id="sortByFilters" className={AvailableStyles.sortByBoxes}
                            onChange={handleSortingChange}>
                        <option value=""></option>
                        <option value="nameAsc">Name (A-Z)</option>
                        <option value="nameDesc">Name (Z-A)</option>
                        <option value="costAsc">Cost (Low to High)</option>
                        <option value="costDesc">Cost (High to Low)</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

AvailableDormsSearchAndSort.propTypes = {
    setPage: PropTypes.func.isRequired,
    setDorms: PropTypes.func.isRequired,
    clickedDorms: PropTypes.array.isRequired,
    sortByFormat: PropTypes.func.isRequired,
    clearDormClick: PropTypes.func.isRequired,
    selectAll: PropTypes.func.isRequired,
    sortDorms: PropTypes.func.isRequired
};

export default AvailableDormsSearchAndSort;
