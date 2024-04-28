import styles from "../../css/information_pages/contact.module.css"
import contact_data from "./contact_data.jsx";
import PropTypes from "prop-types";
import {useState} from "react";

/*The function below is used by a map to generate all the contacts for every housing representative*/
function ContactPerson({jobTitle, firstName, lastName, email}) {
    return (
        <>
            <div className={styles.contactPersonContainer}>
                <p className={styles.jobTitle}>{jobTitle}</p>
                <p>{`${firstName} ${lastName}`}</p>
                <p>{email}</p>
            </div>
        </>
    )
}

ContactPerson.propTypes = {
    jobTitle: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};

/*The function below is used to display the contact information for the office*/
function ContactInformationBlock({description, email, phone}) {
    return (
        <>
            <div>
                <p>{description}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
            </div>
        </>
    )
}
ContactInformationBlock.propTypes = {
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
};

function Contact() {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        message: ""
      });

    // Update functions for name, email, and message
    const handleNameChange = (e) =>
        setContact((prevContact) => ({ ...prevContact, name: e.target.value }));

    const handleEmailChange = (e) =>
        setContact((prevContact) => ({ ...prevContact, email: e.target.value }));

    const handleMessageChange = (e) =>
        setContact((prevContact) => ({ ...prevContact, message: e.target.value }));

    //Send message
    const messageSent = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/contact', {
                method: 'POST',
                body: JSON.stringify({
                    name: contact.name,
                    email: contact.email,
                    message: contact.message,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('Message submitted successfully!');
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Error submitting message.'; // Default message
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Error connecting to backend:", error);
        }
        // Clear the form
        setContact({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <>
            <div className={styles.contactPageContainer}>
                <div id="ContactInformationColumn" className={styles.contactInformationContainer}>
                    <div>
                        <h2>Contacts</h2>
                        {
                            contact_data.map((contact, index) => {
                                return (
                                    <ContactPerson
                                        key={index} // Use a unique identifier as the key
                                        jobTitle={contact.jobTitle}
                                        firstName={contact.firstName}
                                        lastName={contact.lastName}
                                        email={contact.email}
                                    />
                                );
                            })
                        }
                    </div>
                    <div className={styles.contactInformationBlock}>
                        <h2>Contact Information</h2>
                        <ContactInformationBlock description={"Contact Us"} email={"iamhome@pacific.edu"}
                                                 phone={"209.946.2331"}/>
                    </div>
                </div>
                <div id="SendMessageColumn" className={styles.sendMessageContainer}>
                    <h2>Send Us a Message</h2>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={contact.name}
                        onChange={handleNameChange} // Handle name input changes
                    />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={contact.email}
                        onChange={handleEmailChange} // Handle email input changes
                    />
                    <textarea
                        className={styles.message}
                        name="message"
                        id="message"
                        rows="4"
                        placeholder="Message"
                        value={contact.message}
                        onChange={handleMessageChange} // Handle message input changes
                    />
                    <button onClick={messageSent}>Send Message</button>
                </div>


            </div>
        </>
    );
}


export default Contact;