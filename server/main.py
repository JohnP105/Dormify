"""
Main module for the Flask application.
"""

from backend import create_app
import os

app = create_app()

# python web server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.getenv("PORT", default=5000))
