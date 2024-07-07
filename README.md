⚡⚡Entgra Stock Management System⚡⚡
This project is a Stock Management System for a clothing business, developed using a React frontend and a Java Spring Boot backend. Both are developed as Maven projects.

🏋🏾‍♂️🏋🏾‍♂️ Table of Contents

Features
Technologies Used
Prerequisites
Installation
Usage
Docker Deployment
Contributing

🏋🏾‍♂️🏋🏾‍♂️ Features

💪 Manage user authentication.
💪 Manage stock items from different sellers or owned products.
💪 Generate unic code for items so that easily manage the store.
💪 Categorize items as SALE or Stock Clearing if owner wants.
💪 Can be filtered data such as what are the our_items, outsource items, sale items, stock clear items, men's shirts and etc.
💪 Showed data via dynemic data grid.
💪 User-friendly interface for managing inventory.

🏋🏾‍♂️🏋🏾‍♂️ Technologies Used

👍 Frontend: React, TypeScript, Ant Design, Redux
👍 Backend: Java Spring Boot, Three tier architecture
👍 Database: MySQL
👍 Containerization: Docker, Docker Compose

🏋🏾‍♂️🏋🏾‍♂️ Prerequisites
Docker and Docker Compose installed on your machine.
Git installed on your machine.

🏋🏾‍♂️🏋🏾‍♂️ Installation
Clone the repositories (`git clone 'https://github.com....'`)

➡️Frontend: https://github.com/Sanduranga/p16_clothing-app.git
➡️Backend: https://github.com/Sanduranga/p16_backend_clothingapp.git

➡️Running Locally
Start the backend server:
`cd backend-repo`
`./mvnw install`
`./mvnw spring-boot:run`

Start the frontend server:
`cd frontend-repo`
`npm install`
`npm run dev`

🏋🏾‍♂️🏋🏾‍♂️ Docker Deployment

⚡Ensure Docker and Docker Compose are installed.
⚡Navigate to the directory containing the docker-compose.yml file (provided through email). Also the frontend folder and backend folder should be same directory.

Build and run the Docker containers:
➡️`docker-compose up --build`
➡️Also you can manually create both frontend and backend images as follows.
make sure to have MySQL:8 image. if not you can search docker hub through internet and then run the MySQL image.
If you've already MySQL image, then navigate to frontend: `cd frontend`
run `docker built -t frontcontainer .`
follow same procedure for backend.
then navigate back after completing create docker images for both. `cd ..`
then run `docker-compose up`

⚡⚡⚡ Although successfully composed up, if backend container does not run, please run again only backend composer container.

The application should now be accessible. The frontend is usually available at http://localhost:5000 and the backend at http://localhost:8080 at your local machine server.

🏋🏾‍♂️🏋🏾‍♂️ Contributing
⚡ I'm welcome your suggetion and advices.
