# DORMIFY

## Description
Dormify is a full-stack dorm app designed to simplify dorm life for students. It provides various features and functionalities to enhance the dormitory experience.


## Installation
### Client Side
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Install extra packages: `npm install @fortawesome/fontawesome-free`
4. Run the application: `npm run dev`

### Server Side
1. Navigate to the server directory: `cd server`
2. Create a virtual environment (if not created already): 
   - Mac Users: `python3 -m venv venv`
   - Window Users: `python -m venv venv`
3. Activate the virtual environment: 
   - Mac Users: `source venv/bin/activate`
   - Window Users: `venv\Scripts\activate`
4. Install required packages (Use `pip` for windows): `pip3 install -r requirements.txt`
5. Run the server: `python3 main.py`

### Run PyTest
1. Navigate to the server directory: `cd server`
2. Create a virtual environment (if not created already): 
   - Mac Users: `python3 -m venv venv`
   - Window Users: `python -m venv venv`
3. Activate the virtual environment: 
   - Mac Users: `source venv/bin/activate`
   - Window Users: `venv\Scripts\activate`
4. Install required packages (Use `pip` for windows): `pip3 install -r backend/requirements.txt`
5. Install pytest module: `pip3 install pytest`
6. Run the test: `pytest`

### Run PyLint
1. Navigate to the server directory: `cd server`
2. Create a virtual environment (if not created already): 
   - Mac Users: `python3 -m venv venv`
   - Window Users: `python -m venv venv`
3. Activate the virtual environment: 
   - Mac Users: `source venv/bin/activate`
   - Window Users: `venv\Scripts\activate`
4. Install required packages (Use `pip` for windows): `pip3 install -r backend/requirements.txt`
5. Install pytest module: `pip3 install pylint`
6. Run the test: `pylint --ignore=data.py $(git ls-files '*.py' | grep -v 'test_.*\.py')`