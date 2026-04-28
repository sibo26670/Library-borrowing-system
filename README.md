# Library-borrowing-system

# Library Book Borrowing System

A complete full-stack web application designed for a campus library to manage its book inventory and borrowing records. This project was developed to demonstrate end-to-end web application development, featuring a Spring Boot REST API and a modern React JS frontend.


---

## Tech Stack & Core Technologies

**Backend: Spring Boot**
* **Java 17** & **Maven Wrapper (`mvnw`)**
* **Spring Web:** REST API architecture.
* **Spring Data JPA & Hibernate:** ORM and database management.
* **MySQL Driver:** Relational database integration.

**Frontend: React JS**
* **React 18:** Functional components and Hooks (`useState`, `useEffect`).
* **React Router DOM:** Client-side routing.
* **Axios:** Promise-based HTTP client for API consumption.
* **React Toastify:** Custom, dark-themed success and error notifications.
* **Styling:** Custom modern dark-themed UI using inline CSS.

---

## Key System Features & Implementation Details

### 1. Backend Architecture
* **Database Seeding:** Utilizes a `CommandLineRunner` bean to automatically seed the MySQL database with initial book data if the tables are empty upon startup.
* **Dynamic Status Updates:** When a book is borrowed, its boolean `available` status automatically switches to `false`. When returned, it reverts to `true`.
* **Strict HTTP Status Codes:** The API accurately returns standard status codes:
  * `200 OK` for successful fetches and updates.
  * `201 Created` when successfully adding a book or borrowing record.
  * `204 No Content` upon successfully deleting a borrow record (returning a book).
  * `404 Not Found` if querying or deleting a non-existent ID.
* **CORS Configured:** Cross-Origin Resource Sharing is enabled globally on controllers via `@CrossOrigin(origins = "*")` to seamlessly connect with the React frontend.

### 2. Frontend Interface
* **Books Page:** Fetches and lists all library inventory. Includes a form to add new titles.
* **Borrow Page:** Features a dynamic dropdown that *only* displays books currently marked as "Available". Validates inputs before POSTing to the backend.
* **Borrow Records:** Displays active loans. Clicking "Return Book" issues a DELETE request, removes the row from the UI, and makes the book available for others again.

---

## Setup & Installation Guide

### Prerequisites
* Java 17 installed
* Node.js and npm installed
* MySQL Server running (via XAMPP, MySQL Workbench, etc.)

### 1. Backend Setup (Spring Boot)
The database (`library_db`) and its tables will automatically generate when the server starts.

1. Ensure your MySQL service is active.
2. Open your terminal and navigate to the backend directory:
   ```
   cd library-backend ```
3. Build and run the application using the included Maven wrapper:
   ```
   .\mvnw clean install
   .\mvnw spring-boot:run
   ```

### 2. Frontend Setup (React JS)

1. Open a new terminal and navigate to the frontend directory:
   ```
   cd library-frontend ```
2. (Windows Users only) If you encounter a script execution error in PowerShell, temporarily bypass the execution policy or use Command Prompt::
   ```
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned ```
3. Install dependencies and start the application:
   ```
   npm install
   npm start
    ```


# Project Screenshots
## API Testing (Postman)
### 1. GET All Books Request

[Insert Screenshot Here]

### 2. POST Add New Book Request

[Insert Screenshot Here]

### 3. POST Create Borrow Record & DELETE Return Request

[Insert Screenshot Here]

## User Interface (React)
### 1. Books Page (Inventory & Add Book Form)

[Insert Screenshot Here]

### 2. Borrow Page (Dynamic Availability Dropdown)

[Insert Screenshot Here]

### 3. Borrow Records List (Active Loans)

[Insert Screenshot Here]
