## Requirements

- Python 3.12 or newer
- pip

## Creating a Virtual Environment

On macOS / Linux:

python -m venv .venv
source .venv/bin/activate

On Windows (PowerShell):

python -m venv .venv
.\.venv\Scripts\Activate.ps1

## Install Dependencies

pip install --upgrade pip
pip install -r requirements.txt

## Run the Development Server

uvicorn main:app --reload