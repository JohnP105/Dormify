"""
Module for sending emails.
"""

from email.message import EmailMessage
import smtplib
import ssl
import re

def is_valid_email(email):
    """
    Check if the provided email address is valid.
    Returns:
        bool: True if the email is valid, False otherwise.
    """
    # Regular expression for a simple email validation
    email_regex = r'^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email)

def send_email(guest_name, guest_email, guest_message):
    """
    Send an email.

    Args:
        guest_name (str): The name of the guest.
        guest_email (str): The email address of the guest.
        guest_message (str): The message from the guest.

    Returns:
        bool: True if the email was sent successfully, False otherwise.
    """
    email_from = 'ramis.hasanli0@gmail.com'
    email_app_pswd = 'fhuteppommcxvoon'

    email_to = 'dormify9@gmail.com'
    email_subject = 'Dorm CONTACT'
    email_content = f'''
    Name: {guest_name}
    Email: {guest_email}
    Message: {guest_message}
    '''

    # Setup port number and server name
    smtp_port = 587                 # Standard secure SMTP port
    smtp_server = 'smtp.gmail.com'  # Google SMTP Server

    email = EmailMessage()
    email['from'] = email_from
    email['to'] = email_to
    email['subject'] = email_subject
    email.set_content(email_content)

    try:
        print('\n    |Connecting to server...')
        # Create SSL context
        email_context = ssl._create_unverified_context()
        with smtplib.SMTP(host=smtp_server, port=smtp_port) as smtp:
            smtp.ehlo()
            smtp.starttls(context=email_context)
            smtp.login(email_from, email_app_pswd)
            print('        |Connected to the server :-)')
            print()
            print(f"    |Sending email to - {email_to.split('@', maxsplit=1)[0]}")
            smtp.send_message(email)
            print(
                f"        |Email successfully sent to - {email_to.split('@', maxsplit=1)[0]}\n")
            return True

    except smtplib.SMTPAuthenticationError:
        print("        |Authentication error. Check your email and password.")
    except smtplib.SMTPException as e:
        print(f"        |SMTP error occurred: {e}")
    except ssl.SSLError as e:
        print(f"        |SSL error occurred: {e}")
    except Exception as e:
        print(f"        |An unexpected error occurred: {e}")

    return False
