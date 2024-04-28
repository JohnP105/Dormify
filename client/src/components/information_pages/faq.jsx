import { useState, useEffect } from 'react'
import ContactExpert from "./contact_expert.jsx";
import FAQBlock from "./faq_block.jsx";
import faq_data from "./faq_data.jsx";

import styles from "../../css/information_pages/faq.module.css"

function FAQ() {
    const [dorms, setDorms] = useState([]);

    useEffect(() => {
        fetchDorms();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const fetchDorms = () => {
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        };

        fetch("http://127.0.0.1:5000/dorms", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch dorms");
                }
                return response.json();
            })
            .then((data) => {
                setDorms(data)
            })
            .catch((error) => {
                console.error("Error connecting to backend:", error);
            });
    };

    // <div>
    //                         {dorms.map(dorm => (
    //                             <div key={dorm.id}>
    //                                 <p>Name: {dorm.name}</p>
    //                                 <p>Type: {dorm.type}</p>
    //                                 {/* Render other dormitory details */}
    //                             </div>
    //                         ))}
    //                     </div>
    return (
        <>
            <div className={styles.faqPageContentsContainer}>
                <h2 className={styles.faqPageContentsContainerH2}>FAQ</h2>
                <div className={`${styles.faqQuestionBlock} ${styles.faqPageContents}`}>
                    {faq_data.map(function (faqObj, index) {
                        return <FAQBlock question={faqObj.question} answer={faqObj.answer} index={index}/>
                    })}
                </div>
                <div className={`${styles.faqPageContents}`}>
                    <ContactExpert/>
                </div>

            </div>

        </>
    );


}


export default FAQ;