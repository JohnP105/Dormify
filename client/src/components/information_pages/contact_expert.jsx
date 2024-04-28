import expert_image from "../../assets/UOP Expert Services.jpg";
import styles from "../../css/information_pages/contact_expert.module.css";

function ContactSupportButton() {
    return (
        <>
            <div className={styles.contactSupport}>
                <p>Contact Support</p>
            </div>
        </>
    )
}

function ContactExpert() {
    return (
        <div className={styles.contactContainer}>
            <div className={styles.contactContent}>
                <h2>Talk to a Housing Expert</h2>
                <p>We are here to answer your questions</p>
                <ContactSupportButton/>
            </div>
            <div className={styles.contactImage}>
                <img src={expert_image} alt="Housing expert"/>
            </div>
        </div>
    );
}

export default ContactExpert;
