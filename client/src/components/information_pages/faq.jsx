import { useState, useEffect } from 'react'
import ContactExpert from "./contact_expert.jsx";
import FAQBlock from "./faq_block.jsx";
import faq_data from "./faq_data.jsx";
import styles from "../../css/information_pages/faq.module.css"

// eslint-disable-next-line react/prop-types
function FAQ({navigation}) {
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
                    <ContactExpert navigation={navigation}/>
                </div>

            </div>

        </>
    );
}


export default FAQ;