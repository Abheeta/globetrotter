# Globetrotter Quiz App

A fun and interactive quiz application to test your knowledge about the world!

## Monorepo Structure

This repository is organized as a monorepo with the following structure:

```
/globetrotter-quiz-app
│── backend/    # Express TypeScript backend
│── frontend/   # React TypeScript frontend
│── README.md
```

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [Yarn](https://yarnpkg.com/) or npm

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/Abheeta/globetrotter.git
cd globetrotter-quiz-app
```

### Install dependencies

#### Backend
```sh
cd backend
npm install  # or yarn install
```

#### Frontend
```sh
cd ../frontend
npm install  # or yarn install
```

## Running the App Locally

### Start the Backend

```sh
cd backend
npm run dev  # or yarn dev
```

### Start the Frontend

```sh
cd frontend
npm run dev  # or yarn dev
```

Once both services are running, open the frontend at `http://localhost:5173` (default Vite dev server port) and ensure the backend is running at `http://localhost:3000`.

## Building the App

### Build Backend
```sh
cd backend
npm run build  # or yarn build
```

### Build Frontend
```sh
cd frontend
npm run build  # or yarn build
```

## Environment Variables

Create a `.env` file in both `backend` and `frontend` directories based on the provided `.env.example` files.

## Contributing

Feel free to open issues and pull requests to improve the project!

## License

This project is licensed under the MIT License.