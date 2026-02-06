# Backend Instructions

### Requirements

- Python 3.12 or newer
- pip

Open a terminal in the backend directory and run these commands

### Create a Virtual Environment

On macOS / Linux:

python3 -m venv .venv
source .venv/bin/activate

On Windows (PowerShell):

python3 -m venv .venv
.\.venv\Scripts\Activate.ps1

### Install Dependencies

pip install --upgrade pip
pip install -r requirements.txt

### Run the backend Development Server

uvicorn main:app --reload

### Frontend Instructions

Open your a terminal in the frontend directory and run

### Install dependencies
npm install

### Run the frontend Development Server
npm run dev