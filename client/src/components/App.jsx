import { useState } from 'react';
import Header from './main_page/header.jsx';
import Navigation from './main_page/navigation.jsx';
import Footer from "./main_page/footer.jsx";
import HouseSelection from "./housing_selection/house_selection.jsx";
import CompareHousing from './compare_housing/compare_housing.jsx';
import FAQ from './information_pages/faq.jsx';
import Contact from './information_pages/contact.jsx';
import '../css/App.css';
import PropTypes from "prop-types";

function PageHeader({ headerText }) {
    return (
        <>
            <div className="pageHeader">{headerText}</div>
        </>
    );
}

PageHeader.propTypes = {
    headerText: PropTypes.string.isRequired,
};

function App() {
    const [page, setPage] = useState('house_selection');
    const [dorms, setDorms] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    // Function to handle changes in the search input
    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    // Function to handle search action
    const handleSearch = () => {
        console.log('Search query:', searchInput);
        const matchingDorms = dorms.filter((dorm) => dorm.name.toLowerCase().startsWith(searchInput.toLowerCase()));
        setDorms(matchingDorms);
        setSearchInput('');
    };

    // Function to handle navigation
    const handleNavigation = (selectedPage) => {
        setPage(selectedPage);
    };


    // Render the appropriate page component based on the current page state
    const renderPage = () => {
        switch (page) {
            case 'house_selection':
                return (
                    <>
                        <PageHeader headerText={"Choose a Dorm"} />
                        <HouseSelection dorms={dorms} setDorms={setDorms} setPage={setPage}/>
                    </>
                );
            case 'compare_housing':
                return (
                    <>
                        <PageHeader headerText={"Compare Housing"} />
                        <CompareHousing dorms={dorms} setPage={setPage}/>
                    </>
                );
            case 'faq':
                return (
                    <>
                        <PageHeader headerText={"Frequently Asked Questions"} />
                        <FAQ navigation={setPage}/>
                    </>
                );
            case 'contact':
                return (
                    <>
                        <PageHeader headerText={"Contact Us"} />
                        <Contact />
                    </>
                );
            default:
                return (
                    <>
                        <PageHeader headerText={"Choose a Dorm"} />
                        <HouseSelection dorms={dorms} setDorms={setDorms} setPage={setPage}/>
                    </>
                );
        }
    };

    return (
        <div className="container">
            <Header />
            <Navigation
                handleNavigation={handleNavigation}
                searchInput={searchInput}
                handleSearchInputChange={handleSearchInputChange}
                handleSearch={handleSearch}
                page={page}
            />
            {renderPage()}
            <Footer />
        </div>
    );
}

export default App;
