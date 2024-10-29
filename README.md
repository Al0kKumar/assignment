# Comment App

Welcome to the Comment App! This application allows users to share their thoughts and engage in discussions through comments. Built with Next.js and Material-UI, this app offers a clean and modern interface for commenting and viewing comments.

## Features

- Real-time commenting using Socket.IO
- User-friendly interface with Material-UI components
- User authentication through usernames
- Responsive design for various screen sizes

## Tech Stack

- **Frontend**: Next.js, React, Material-UI
- **Backend**: Node.js, Express, Socket.IO
- **Database**: MySQL with Prisma ORM

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) (Node Package Manager)
- [Docker](https://www.docker.com/get-started)

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/Al0kKumar/assignment.git
```
### 2.  Install dependencies
    
**Frontend**

```bash
cd frontend
npm install
```
**Backend**

```bash
cd backend
npm install
```

### 3. Set up the MySQL database with Docker

```bash
cd backend
docker-compose up -d
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev --name init 
npx prisma generate 
```

### 5. Start the Backend Server

```bash
npm run build
npm start
```

### 6. Start the frontend 

```bash
cd ..
cd frontend
npm run dev
```
