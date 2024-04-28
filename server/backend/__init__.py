"""
Main module for the Flask application.

This module initializes the Flask application, registers blueprints,
creates tables in the database, and runs the Flask application.
"""

from flask import Flask
from flask_cors import CORS

from .database import create_table, insert_data_from_dorms
from .routes import dorms_bp, DATABASE_URL


def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)
    cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

    # Register the dormitories blueprint
    app.register_blueprint(dorms_bp)

    # Initialize database tables and insert initial data
    with app.app_context():
        create_table(DATABASE_URL)
        insert_data_from_dorms(DATABASE_URL)

    return app
