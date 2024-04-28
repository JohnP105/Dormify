"""
Unit tests for the create_app function in backend module.
Make sure app is running and being created as a Flask instance.
"""

import pytest
from flask import Flask
from backend import create_app


@pytest.fixture
def test_app():
    """Create a test Flask application."""
    app = create_app()
    yield app


def test_create_app(test_app):
    """Test if create_app function returns a Flask application instance."""
    # Make sure that the test_app object is not None,
    assert test_app is not None

    # Make sure that the test_app object is an instance of the Flask class,
    assert isinstance(test_app, Flask)


def test_dorms_blueprint_registered(test_app):
    """Test if dorms blueprint is registered"""
    # (True==True)
    assert 'dorms' in test_app.blueprints  # Check if 'dorms' blueprint exists

    """Test if other blueprints are not registered"""
    # (False==False)
    assert 'bike' not in test_app.blueprints  # Check if 'bike' is not registered