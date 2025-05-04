# Route Optimizer Web Application

## Project Overview

The Route Optimizer is a web application that uses the **Simulated Annealing** algorithm to find the shortest possible route that visits all given cities. This web app allows users to optimize travel routes by leveraging real-world data and provides a fast and efficient way to find the best way to visit multiple cities.

### Key Features:
- **Optimized Route**: Calculate the shortest route visiting multiple cities.
- **Real-World Cities**: Input real-world cities and calculate routes based on actual distances.
- **Interactive UI**: Built with React for a responsive and dynamic user experience.
- **Backend Integration**: The backend is powered by Spring Boot, handling the core algorithm and business logic.
  
## Technologies Used

### Frontend:
- **React.js**: JavaScript library for building user interfaces.
- **Vite**: Build tool and development server for fast frontend workflows.
- **CSS**: Styling the user interface to provide a clean and modern look.

### Backend:
- **Spring Boot**: Framework for building the backend, handling the Simulated Annealing algorithm.
- **Java**: The core programming language for backend logic.
- **Maven**: Dependency management and build tool for the backend.

### Algorithm:
- **Simulated Annealing**: A probabilistic algorithm used for finding an approximate solution to the Traveling Salesman Problem (TSP), aiming to find the shortest possible route.

## Installation

### Prerequisites:
Make sure you have the following installed on your machine:
- **Node.js** (for the frontend)
- **Java** (for the backend)
- **Maven** (for building and running the backend)

### Setting Up the Project:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/route-optimizer.git
   cd route-optimizer

Frontend (React.js) Setup:

Navigate to the frontend folder:

```bash
cd frontend
//Install dependencies:
```
``` bash
npm install
//Start the React development server:
npm run dev
The frontend should now be running on http://localhost:3000.
```
Backend (Spring Boot) Setup:

Navigate to the backend folder:

```bash
cd ../backend
//Build the project using Maven:
mvn clean install
//Run the backend
mvn spring-boot:run
///The backend should now be running on http://localhost:8080.
```
Testing the Full Application:

Once both servers (frontend and backend) are running, navigate to http://localhost:3000 in your browser to access the web app.

## Usage
Once the web application is running, you can interact with it through the user interface. Here's how:

- **Enter Cities**: You can add a list of cities that you'd like to optimize the route for.

- **Optimize**: Click the "Optimize Route" button to start the Simulated Annealing algorithm and calculate the shortest route.

- **View Results**: The optimized route will be displayed on the screen along with the total distance.

## Contributing
We welcome contributions! If you would like to contribute to this project, follow the steps below:

Fork the Repository: Click on the "Fork" button at the top right of this page to create your own copy of the repository.

Clone Your Fork:

```bash
git clone https://github.com/your-username/route-optimizer.git
Create a New Branch:
```
``` bash

git checkout -b feature/your-feature-name
Make Changes: Implement your changes or add new features.

Commit Your Changes:
```
```bash
git commit -m "Describe your changes"
Push to Your Fork:
```
```bash
git push origin feature/your-feature-name
Create a Pull Request: Go to the original repository and submit a pull request with a description of your changes.
```
## License
This project is licensed under the MIT License – see the LICENSE file for details.

## Acknowledgments
Simulated Annealing algorithm for the traveling salesman problem.

React for the frontend framework.

Spring Boot for the backend framework.


