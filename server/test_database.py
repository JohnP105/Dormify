"""
Test module for database functionality.
Contains tests to ensure the database tables are created and data are inserted correctly.
"""

import psycopg2

# Mock database URL for testing (you can use a different test database if available)
TEST_DATABASE_URL = ("postgres://ksfsnapm:F6hkTQ14p2w5oDdIZ96HhocKLEFNF1KU@bubble"
                     ".db.elephantsql.com/ksfsnapm")


def test_database_table_exist():
    """Test if the Flask application is created with database tables and data."""

    # Check if table exists
    conn = psycopg2.connect(TEST_DATABASE_URL)
    cur = conn.cursor()

    # Test if 'Dorm' table exists (True==True)
    cur.execute("SELECT * FROM Dorm")
    assert cur.fetchone() is not None  # Check if at least one row is returned

    # Test to see if there are other Table that exist in the database
    try:
        cur.execute("SELECT COUNT(*) FROM Bike")
        assert False
    except psycopg2.errors.UndefinedTable:
        # Bike Table should not exist in the database
        assert True

    conn.close()


def test_database_data_insert():
    """Test if data has been inserted into the database."""
    # Check if data has been inserted
    conn = psycopg2.connect(TEST_DATABASE_URL)
    cur = conn.cursor()

    # Test if data has been inserted into 'Dorm' table (True==True)
    cur.execute("SELECT COUNT(*) FROM Dorm")
    count = cur.fetchone()[0]
    assert count > 0  # Check if count of rows is greater than 0

    # Test to see if there are other Table to insert from that exist in the database
    try:
        cur.execute("SELECT COUNT(*) FROM Bike")
        assert False
    except psycopg2.errors.UndefinedTable:
        # Bike Table should not exist in the database
        assert True

    conn.close()
