import FiltersPanel from "./FiltersPanel.jsx";
import AvailableDormsSearchAndSort from "./AvailableDormsSearchAndSort.jsx";
import styles from "../../css/housing_selection/house_selection.module.css";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DisplayView from "./DisplayView.jsx";
function HouseSelection({dorms, setDorms, setPage}) {
    const [clickedDorms, setClickedDorms] = useState([]);
    const [selectedDormId, setSelectedDormId] = useState([]); // State to store selected dorm ID
    const [displayView, setDisplayView] = useState('Gallery')
    const [selectAll, setSelectAll] = useState(false);
    const [keepTrackSelect, setTrackSelect] = useState(false);
    const [filters, setFilters] = useState({
        semesterRate: 10000,
        mealPlan: 21,
        dormType: [], // if array is empty, no specific type is preferred
        amenities: [], // if array is empty, no specific amenities is preferred
        groupExclusive: [] // if array is empty, no specific group-exclusion is preferred
    });

    const changeDisplay =(value) =>{
        setDisplayView(value)
    }
    useEffect(() => {
        fetchDorms();
    }, []);

    useEffect(() => {
        applyFilters();
        clearClicks();
        // console.log("Filters:");
        // console.log(JSON.stringify(filters, null, 2));
    }, [filters]);

    const fetchDorms = async () => {
        try {
            const response = await fetch("https://dormify-production.up.railway.app/dorms");
            if (!response.ok) {throw new Error("Failed to fetch dorms");}
            const data = await response.json();
            setDorms(data);
        } catch (error) {console.error("Error connecting to backend:", error);}
    };

    const applyFilters = async () => {
        try {
            const queryParams = new URLSearchParams({
                semesterRate: filters.semesterRate,
                mealPlan: filters.mealPlan,
                dormType: filters.dormType,
                amenities: filters.amenities,
                groupExclusive: filters.groupExclusive
            });

            const response = await fetch(`https://dormify-production.up.railway.app/dorms-filter?${queryParams}`);
            if (!response.ok) { throw new Error("Failed to fetch dorms"); }
            const data = await response.json();
            setDorms(data);
        } catch (error) { console.error("Error connecting to backend:", error); }
    };

    const showInfoOnClick = (dormId) => {
        setSelectedDormId((prevIds) => {
            if (prevIds.includes(dormId)) { return prevIds.filter((id) => id !== dormId);
            } else { return [...prevIds, dormId];}
        });
    };

    const handleDormClick = (dorm) => {
        setClickedDorms((prevClickedDorms) => {
            const dormIndex = prevClickedDorms.findIndex((item) => item.id === dorm.id);
            if (dormIndex !== -1) {
                // Dorm object already exists, remove it
                return prevClickedDorms.filter((item) => item.id !== dorm.id);
            } else {
                // Dorm object does not exist, add it
                return [...prevClickedDorms, dorm];
            }
        });
    };

    const clearClicks = ()=> {
        setSelectedDormId([]);
        setClickedDorms([]);
        setSelectAll(false);
        setTrackSelect(prevState => !prevState);
        applyFilters()
    }

    const selectAllDorms = () => {
        setClickedDorms(dorms);
        setSelectAll(true);
        setTrackSelect(prevState => !prevState);
    };

    const sortDorms = (val) => {
        switch (val) {
            case ("costAsc"): {
                // Sort by cost (ascending order)
                setDorms([...dorms].sort((a, b) => a.semester_rate - b.semester_rate));
                break;
            }
            case ("costDesc"): {
                // Sort by cost (descending order)
                setDorms([...dorms].sort((a, b) => b.semester_rate - a.semester_rate));
                break;
            }
            case ("nameAsc"): {
                // Sort by name (ascending order)
                setDorms([...dorms].sort((a, b) => a.name.localeCompare(b.name)));
                break;
            }
            case ("nameDesc"): {
                // Sort by name (descending order)
                setDorms([...dorms].sort((a, b) => b.name.localeCompare(a.name)));
                break;
            }
            default: {
                break;
            }
        }
        console.log(dorms);
    }

    return (
        <>
            <div className={`${styles.house_selection} ${styles.house_selection_panel} ${styles.container}`}>
                <div>
                    <FiltersPanel filters={filters} setFilters={setFilters} DisplayView={displayView}/>
                    <AvailableDormsSearchAndSort
                        setPage={setPage}
                        setDorms={setDorms}
                        clickedDorms={clickedDorms}
                        sortByFormat = {(value)=> changeDisplay(value)}
                        clearDormClick={clearClicks}
                        selectAll={selectAllDorms}
                        sortDorms={sortDorms}
                    />
                    <DisplayView
                        selectedDormId={selectedDormId}
                        dorms={dorms}
                        Display={displayView}
                        showInfoOnClick ={(value)=>showInfoOnClick(value)}
                        handleDormClick={(value)=>handleDormClick(value)}
                        selectAll={selectAll}
                        prevState={keepTrackSelect}
                        clickedDorms={clickedDorms}
                    />
                </div>
            </div>
        </>
    );
}

// Add prop validation for dorms
HouseSelection.propTypes = {
    dorms: PropTypes.array.isRequired,
    setDorms: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
};

export default HouseSelection;