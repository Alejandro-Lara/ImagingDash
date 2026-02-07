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

# Frontend Instructions

Open your a terminal in the frontend directory and run

### Install dependencies

npm install

### Run the frontend Development Server

npm run dev

### Frontend Usage

You can now access the interface through your browser on http://localhost:5173/

# Architecture

The frontend just uses python, fastApi, and pydantic models, as well as uvicorn and virtual environments which are typical for dev servers.
No real decision making for those, they were all common practice to use.

The backend is using react, axios, and vite
I'm using axios to make web requests, and I chose it out of familiarity
Vite is used for the dev server and building. I wasnt really familiar with it at first but the AI tool I used to boiler plate the react project
suggested it, and it was lightweight enough for me to not to get rid of it like some other things it suggested.

# Tradeoffs and design

For the backend my trade off descision was with data storage. I chose to use an in memory list instead of a database like sqllite.
The reason was just to keep things as simple as possible and save my time for developing the frontend which I knew would take more effort.
Also for a larger web app I'd look for some sort of library that makes expanding the filtering and paging scheme easier.

I feel like the backend design is very simple and typical for the features outlined. 

For the frontend my main trade offs involved simplifying the UI for time constraints. I would have liked to add more filtering options and a clear button
for the the table, but ended up with just the required fields. Even though the backend is prepared for more filtering. Was also planning on adding a loading animation and light/dark mode (controlled through the header), but had to cut it.
I also hardcoded the api endpoint on the frontend, when it should be hidden in a real web app.
Finally, I had to simplify the paging logic on the frontend. Usually I would have kept fetched pages stored in memory so that I don't have to re-request them unless the filters change. Only one page of data is stored at a time, so changing pages always causes a request.
I organized my components into molecules and atoms based on complexity, which is typical. I probably could have broken down my molecules a bit more, but I think it's flexible enough for these features.

In the past I've used tools to automatically generate frontend models and interface classes by analyzing the source code of the backend. Definitely would use that, instead of working manually if I had to do this again.