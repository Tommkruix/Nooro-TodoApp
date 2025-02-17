# Nooro App

## Overview

Nooro is a full-stack web application built with:

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Express.js, TypeScript, Prisma, MySQL, Axios, Swagger
- **Containerization:** Docker

This guide provides two methods to set up and run the application:

1. **Using Docker** (Recommended, One-command setup)
2. **Manual Setup** (Setting up MySQL and running services manually)

In this repository, the screenshots are placed in a `screenshots` directory within the repository directory.
This will help provide visual guidance to users setting up and running the Nooro web app.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Version: `18.20.4`)
- [Docker & Docker Compose](https://www.docker.com/get-started) *(For Docker setup)*
- [MySQL](https://dev.mysql.com/downloads/) *(For manual setup)*

---

## 🚀 Option 1: Running with Docker (Recommended)

This method runs everything inside Docker containers with a single command.

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-repo/nooro.git
   cd nooro
   ```

2. **Run the app with a single command:**

   ```sh
   bash ./start.sh
   ```

   This will:
      - Set up a MySQL database container
      - Build and start the backend and frontend containers
      - Automatically apply Prisma migrations

3. **Access the Application**

- 🌐 Frontend: [`http://localhost:3000/`](http://localhost:3000/)
- 📜 API Documentation: [`http://localhost:4000/api-docs/`](http://localhost:4000/api-docs/)
- 🛠 Prisma Studio (DB GUI): Run `npm run prisma:studio` inside the backend container, then visit [http://localhost:5555/](http://localhost:5555/)

### **(Optional) Test Prisma DB Connection Inside Docker**

```bash
docker-compose exec backend npx ts-node test-db-connection.ts
```

---

## 🛠 Option 2: Manual Setup

If you prefer, you can run the backend and frontend manually by setting up MySQL yourself.

### **Step 1: Set Up MySQL**

1. Install MySQL and run it on port **3306**.
2. Create a database named `nooro`.
3. Create a user:

   ```sql
   CREATE DATABASE nooro;
   CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON nooro.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   ```

### **Step 2: Configure the Backend**

1. Update the backend `.env` file (`/nooro/backend/.env`):

   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/nooro"
   ```

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run Prisma migrations:

   ```bash
   npm run migrate_db
   ```

5. (Optional) Seed the database:

   ```bash
   npm run seed_db
   ```

6. Verify that the database `nooro` and the table `Todo` now exist.

7. Start the backend server (using `nodemon` in watch mode):

   ```bash
   npm run dev
   ```

### **Step 3: Configure and Start the Frontend**

1. Navigate to the frontend directory:

   ```bash
   cd ../front-end
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:

   ```bash
   npm run dev
   ```

### **Step 4: Access the Application**

- 🌐 Frontend: [`http://localhost:3000/`](http://localhost:3000/)
- 📜 API Documentation: [`http://localhost:4000/api-docs/`](http://localhost:4000/api-docs/)
- 🛠 Prisma Studio: [`http://localhost:5555/`](http://localhost:5555/) *(Run separately, see below)*

### **Step 5: (Optional) Run Prisma Studio**

If you want to explore the database visually:

```bash
cd backend
npm run prisma:studio
```

This will launch Prisma Studio at [`http://localhost:5555/`](http://localhost:5555/).

---
****

## Additional Notes

- The backend uses **Express.js with TypeScript** and **Prisma ORM** for database management.
- The frontend is built with **Next.js, TypeScript, and Tailwind CSS**.
- **Swagger** is used for API documentation.
- **Docker** provides easy containerization for seamless development and deployment.

---

## 🎯 Summary

| Feature              | Docker Setup | Manual Setup |
|----------------------|--------------|--------------|
| Database            | Auto-created | Manual setup required |
| Backend Setup      | Automatic | Requires installation, migration |
| Frontend Setup      | Automatic | Requires installation |
| API Documentation  | ✅ Available at `/api-docs/` | ✅ Available at `/api-docs/` |
| Prisma Studio      | ✅ Available, manual start required | ✅ Available, manual start required |

---

## 📌 Troubleshooting

### **Backend Can't Connect to MySQL**

- Ensure MySQL is running and the `.env` file is correctly set up.
- If using Docker, restart services:

  ```bash
  docker-compose down && docker-compose up --build
  ```

### **Port Conflicts**

If you get an error like `Port already in use`:

- Stop any services running on ports **3000, 4000, or 3306**.
- Change ports in `docker-compose.yml` or `.env` files if necessary.

---

## ✅ Next Steps

- Setup and write tests.
- Optimize further.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Developed by **Tommkruix** for **Nooro Team** 🚀

For any issues, please create a GitHub issue or reach out to the developer.
