"""
Test module for the dormitories API routes.
Contains tests to ensure that the dormitories API routes are functioning correctly.
"""

import pytest
from backend import create_app, dorms_bp


@pytest.fixture
def test_app():
    """Create a test Flask application."""
    app = create_app()
    yield app


def test_get_dormitories_route(test_app):
    """Test the GET /dorms route."""
    with test_app.test_client() as client:
        # Test GET request to '/dorms' route
        response = client.get('/dorms')
        assert response.status_code == 200  # Check if response status code is 200
        assert response.data is not None  # Check if response data is not empty

        # Test GET request to '/students' route (nonexistent route)
        response = client.get('/students')
        assert response.status_code == 404  # Check if response status code is 404 (Not Found)









