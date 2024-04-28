"""
Initialization module for the database.

This module contains functions to create the 'Dorm' table in the PostgreSQL database
and insert data from the dorms list into the table.
"""

import psycopg2
from .data import dorms

# SQL command to create the "dormitories" table for PostgreSQL
CREATE_TABLE_COMMAND = """
CREATE TABLE IF NOT EXISTS Dorm (
    id SERIAL PRIMARY KEY,
    name TEXT,
    type TEXT,
    semester_rate INTEGER,
    meal_plan INTEGER,
    group_exclusion TEXT,
    climate_control BOOLEAN,
    kitchen BOOLEAN,
    furnished BOOLEAN,
    pool BOOLEAN,
    personal_bathroom BOOLEAN,
    ethernet BOOLEAN,
    map_location TEXT, 
    info Text -- Link to the dorm info page on pacific website
)
"""


def create_table(database_url):
    """Create 'Dorm' table in the PostgreSQL database."""
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()

        # Execute the create table command for PostgreSQL
        cur.execute(CREATE_TABLE_COMMAND)

        # Commit the changes
        conn.commit()

        print("Table 'Dorm' created successfully in PostgreSQL database")

    except psycopg2.DatabaseError as e:
        print(f"An error occurred in PostgreSQL database: {e}")
    finally:
        # Close communication with the database
        if cur:
            cur.close()
        if conn:
            conn.close()


def insert_data_from_dorms(database_url):
    """Insert data from the dorms list into the 'Dorm' table."""
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()

        # Check if data already exists in the table
        cur.execute("SELECT COUNT(*) FROM Dorm")
        count = cur.fetchone()[0]
        if count > 0:
            print("Data already exists in the 'Dorm' table. Skipping insertion.")
            return

        # Insert data from dorms list into the dormitories table
        cur.executemany(
            "INSERT INTO Dorm "
            "(name, type, semester_rate, meal_plan, group_exclusion, "
            "climate_control, kitchen, furnished, pool, personal_bathroom, "
            "ethernet, map_location, info) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            dorms
        )

        # Commit the changes
        conn.commit()
        print("Data inserted successfully into 'Dorm' table in PostgreSQL database")

    except psycopg2.DatabaseError as e:
        print(f"An error occurred in PostgreSQL database: {e}")
    finally:
        # Close communication with the database
        if cur:
            cur.close()
        if conn:
            conn.close()
