import '../../css/main_page/navigation.css';
import '@fortawesome/fontawesome-free/css/all.css';
import PropTypes from "prop-types";

function Navigation({handleNavigation, searchInput, handleSearchInputChange, handleSearch, page}) {
    const renderSearch = () => {
        if (page !== "house_selection" && page !== "compare_housing") {
            return null;
        }
        return (
             // Search input and button
            <div className="search-button">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        );
    }

    return (
        <div className="pages">
            <ul className="select_pages">
                <li className="pages_list">
                    <div className="housing_selection">
                        <i className="fas fa-home"></i> {/* FontAwesome icon for home */}
                        <a href="#" onClick={() => handleNavigation('house_selection')}>Housing Selection</a>
                    </div>
                </li>
                <li className="pages_list">
                    <div className="compare_housing">
                        <i className="fas fa-chart-bar"></i> {/* FontAwesome icon for compare housing */}
                        <a href="#" onClick={() => handleNavigation('compare_housing')}>Compare Housing</a>
                    </div>
                </li>
                <li className="pages_list">
                    <div className="faq">
                        <i className="fas fa-question-circle"></i> {/* FontAwesome icon for FAQ */}
                        <a href="#" onClick={() => handleNavigation('faq')}>FAQ</a>
                    </div>
                </li>
                <li className="pages_list">
                    <div className="contact">
                        <i className="fas fa-envelope"></i> {/* FontAwesome icon for contact */}
                        <a href="#" onClick={() => handleNavigation('contact')}>Contact Us</a>
                    </div>
                </li>
            </ul>
            {renderSearch()}
        </div>
    );
}

Navigation.propTypes = {
    handleNavigation: PropTypes.func.isRequired,
    searchInput: PropTypes.string.isRequired,
    handleSearchInputChange: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    page: PropTypes.string.isRequired
};

export default Navigation;