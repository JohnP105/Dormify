import expert_image from "../../assets/UOP Expert Services.jpg";
import styles from "../../css/information_pages/contact_expert.module.css";

// eslint-disable-next-line react/prop-types
function ContactSupportButton({navigation}) {
    return (
        <>
            <div onClick={() => navigation("contact")} className={styles.contactSupport}>
                <p>Contact Support</p>
            </div>
        </>
    )
}
// eslint-disable-next-line react/prop-types
function ContactExpert({navigation}) {
    return (
        <div className={styles.contactContainer}>
            <div className={styles.contactContent}>
                <h2>Talk to a Housing Expert</h2>
                <p>We are here to answer your questions</p>
                <ContactSupportButton navigation={navigation}/>
            </div>
            <div className={styles.contactImage}>
                <img src={expert_image} alt="Housing expert"/>
            </div>
        </div>
    );
}

export default ContactExpert;