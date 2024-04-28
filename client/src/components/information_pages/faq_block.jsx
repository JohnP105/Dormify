import React from 'react';
import styles from "../../css/information_pages/faq_block.module.css"

import down_arrow_img from "../../assets/down_arrow.png"
import up_arrow_img from "../../assets/up_arrow.png"



function FAQBlock({question, answer, index}) {

    const dropDownSelector = "dropdown-button-"+index;
    const answerSelector = "answer-"+index;

    const imagRef = React.createRef()

    let currentDropdownSymbol = down_arrow_img


    const handleMinimize = () => {
        let dropDownButton = document.getElementsByClassName(dropDownSelector)[0]
        let answerElement = document.getElementsByClassName(answerSelector)[0]

        // If the answer block is toggled off, then toggle it on now
        if (answerElement.style.display === "none") {
            answerElement.style.display = "block"
            imagRef.current.src = up_arrow_img
        }
        // If the answer block is toggled on, then toggle it off now
        else {
            answerElement.style.display = "none"
            imagRef.current.src = down_arrow_img
        }


        console.log("The drop down button was pressed successfully")
    }


    return (
        <>
            <div className={styles.faqContainer}>
                <div className={styles.faqHeaderContainer}>
                    <h2>{question}</h2>
                    <img className={dropDownSelector} src={currentDropdownSymbol} ref={imagRef} alt={"Down arrow to toggle answer"} onClick={handleMinimize}/>
                </div>
                <div className={`${styles.faqAnswerContainer} ${answerSelector}`}>
                    <p>{answer}</p>
                </div>
            </div>

        </>
    )
}

export default FAQBlock;