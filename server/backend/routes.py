"""
Routes module for defining API endpoints.
"""

import psycopg2
from flask import Blueprint, jsonify, request
from .email_sender import is_valid_email, send_email

# Define a Blueprint for routes
dorms_bp = Blueprint('dorms', __name__)

# Database connection string for PostgreSQL
DATABASE_URL = (
    "postgres://ksfsnapm:F6hkTQ14p2w5oDdIZ96HhocKLEFNF1KU@bubble"
    ".db.elephantsql.com/ksfsnapm"
)

# Database connection function
def get_db_connection():
    """Establishes a connection to the PostgreSQL database."""
    conn = psycopg2.connect(DATABASE_URL)
    return conn

# Define a function to convert dormitories to a list of dictionaries
def convert_dormitories_to_list(dormitories):
    """Convert dormitories to a list of dictionaries."""
    dorm_list = []
    for dorm in dormitories:
        dorm_dict = {
            "id": dorm[0],
            "name": dorm[1],
            "type": dorm[2],
            "semester_rate": int(dorm[3]),
            "meal_plan": int(dorm[4]),
            "group_exclusion": dorm[5],
            "climate_control": bool(dorm[6]),
            "kitchen": bool(dorm[7]),
            "furnished": bool(dorm[8]),
            "pool": bool(dorm[9]),
            "personal_bathroom": bool(dorm[10]),
            "ethernet": bool(dorm[11]),
            "map_location": dorm[12],
            "info": dorm[13]
        }
        dorm_list.append(dorm_dict)
    return dorm_list

@dorms_bp.route('/dorms', methods=['GET'])
def get_dormitories():
    """Retrieve all dormitories from the database."""
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute('SELECT * FROM Dorm')
            dormitories = cur.fetchall()

            # Convert dormitories to list of dictionaries
            dorm_list = convert_dormitories_to_list(dormitories)
    except psycopg2.Error as e:
        return jsonify({'error': str(e)}), 500  # Return error response
    finally:
        # Ensure the database connection is closed
        if conn:
            conn.close()

    return jsonify(dorm_list), 200  # Return JSON response with dormitory data

@dorms_bp.route('/dorms-filter', methods=['GET'])
def filter_dormitories():
    """Filter dormitories based on provided filters."""
    try:
        # Extract filters from query parameters
        semester_rate = request.args.get('semesterRate')
        meal_plan = request.args.get('mealPlan')
        dorm_type = request.args.getlist('dormType') if request.args.getlist('dormType') != [''] else []
        amenities = request.args.getlist('amenities') if request.args.getlist('amenities') != [''] else []
        group_exclusive = request.args.getlist('groupExclusive') if request.args.getlist('groupExclusive') != [''] else []

        print("Semester Rate:", semester_rate)
        print("Meal Plan:", meal_plan)
        print("Dorm Type:", dorm_type)
        print("Amenities:", amenities)
        print("Group Exclusive:", group_exclusive)

        # Construct SQL query based on filters
        query = 'SELECT * FROM Dorm WHERE semester_rate <= %s AND meal_plan <= %s'
        params = [semester_rate, meal_plan]

        if len(dorm_type):
            dorm_type_list = dorm_type[0].split(',')
            query += ' AND type IN %s'
            params.append(tuple(dorm_type_list))

        if len(amenities):
            amenities_type_list = amenities[0].split(',')
            # Constructing the condition for checking amenities
            for amenity in amenities_type_list:
                # Change amenity name to match database attribute
                temp = amenity.replace(" ", "_").lower()
                query += f" AND {temp} = TRUE"

        if len(group_exclusive):
            group_exclusive_list = group_exclusive[0].split(',')
            query += ' AND group_exclusion IN %s'  # Assuming 'type' is the column for dorm type
            params.append(tuple(group_exclusive_list))

        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute(query, tuple(params))
            dormitories = cur.fetchall()

            # Convert dormitories to list of dictionaries
            dorm_list = convert_dormitories_to_list(dormitories)

    except psycopg2.Error as e:
        return jsonify({'error': str(e)}), 500  # Return error response
    finally:
        # Ensure the database connection is closed
        if conn:
            conn.close()

    return jsonify(dorm_list), 200  # Return JSON response with filtered dormitory data

@dorms_bp.route('/contact', methods=['POST'])
def send_message():
    """ Send Message """
    try:
        # Extract data from request body (assuming JSON format)
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Check if the email is valid
        if not is_valid_email(email):
            return jsonify({'message': 'Invalid Email'}), 500

        # Send email
        if send_email(name, email, message):
            return jsonify({'message': 'Email sent successfully!'}), 200

    except psycopg2.Error as e:
        return jsonify({'message': str(e)}), 500  # Return error response

    # Email failed to send (or other errors)
    return jsonify({'message': 'Server Error - SEND EMAIL FAILED'}), 500
