# Books API Version-1

The Books API provides a comprehensive set of endpoints to interact with a collection of books. It allows users to perform various operations related to books, including creating new books, retrieving book details, updating book information, and deleting books.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Endpoint Version-1](#endpoint-version-1)
- [Drawbacks of Not Using Authentication](#drawbacks-of-not-using-authentication)
- [Decisions and Assumptions](#decisions-and-assumptions)
- [Books API Version 2](#books-api-version-2)
  - [New Features](#new-features)
  - [Endpoints Version-2](#endpoints-version-2)

## Getting Started

These instructions will help you set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system
- [Git](https://git-scm.com/) installed on your system

### Installation

1. Clone the GitHub repository to your local machine:

   ```bash
   git clone https://github.com/hafeez25/books_api.git
   cd books_api
   npm install
   ```

2. Create a new `.env` file in your project directoy and setup according to the `.env.example` file:

   ```
      PORT=5000
      JWT_SECRET=your_jwt_secret
      MONGO_URI=your_mongodb_uri
      CLOUD_NAME=your_cloudinary_cloud_name
      API_KEY=your_cloudinary_api_key
      API_SECRET=your_cloudinary_api_secret
   ```

### Usage

1. Start the application by running the following command in your project directory:

   ```bash
   node server.js
   ```

## Endpoint Version-1

### Create a Book

- **Method:** `POST`
- **Endpoint:** `https://tiny-red-beetle-boot.cyclic.app/api/v1/books`
- **Description:** Create a new book by providing the title, author, and a summary.

```http
POST /api/v1/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "summary": "A tale of the American Dream in the 1920s."
}
```

### Get All Books

- **Method:** `GET`
- **Endpoint:** `https://tiny-red-beetle-boot.cyclic.app/api/v1/books`
- **Description:** Retrieve a list of all books in the books. Books are sorted in descending order by their unique identifiers.

### Get Book by ID

- **Method:** `GET`
- **Endpoint:** `https://tiny-red-beetle-boot.cyclic.app/api/v1/books/:id`
- **Description:** Retrieve the details of a specific book by providing its unique identifier.

### Update a Book

- **Method:** `PATCH`
- **Endpoint:** `https://tiny-red-beetle-boot.cyclic.app/api/v1/books/:id`
- **Description:** Update the information of a book using its unique identifier. This endpoint allows you to update specific fields of a book.

### Delete a Book

- **Method:** `DELETE`
- **Endpoint:** `https://tiny-red-beetle-boot.cyclic.app/api/v1/books/:id`
- **Description:** Delete a book from the books using its unique identifier.

## Responses

Successful responses return the requested data or a success message with appropriate HTTP status codes (e.g., 200 OK, 201 Created).

In case of errors, the API responds with error messages and the appropriate HTTP status codes (e.g., 400 Bad Request for client errors, 404 Not Found for resource not found, and 500 Internal Server Error for server errors).

## Drawbacks of Not Using Authentication

Not using authentication in the Books API can lead to several security and operational drawbacks, including:

1. **Unauthorized Access:** Without proper authentication, your API may be vulnerable to unauthorized access. This means anyone can send requests to your API, potentially causing data breaches or unauthorized usage.

2. **Data Integrity:** Lack of authentication can result in compromised data integrity. Users may tamper with or manipulate data, leading to incorrect or malicious information in your book collection.

3. **Limited Access Control:** Authentication is crucial for controlling who can perform sensitive operations. Without it, you have limited control over who can create, update, or delete books, potentially leading to misuse or accidental deletions.

4. **Security Vulnerabilities:** Without authentication, your API may be exposed to various security vulnerabilities, such as cross-site request forgery (CSRF) and unauthorized API access.

5. **Audit Trails:** Proper authentication allows you to maintain audit trails of API actions. Without it, tracking and auditing actions become challenging, hindering the ability to investigate any issues or incidents.

6. **Compliance Requirements:** Many industries and regulations require authentication and user access control to comply with data protection and privacy regulations. Neglecting authentication may result in non-compliance with legal requirements.

## Decisions and Assumptions

During the development process of my API, I made several key decisions and assumptions to enhance its functionality and user experience. These decisions include:

**1. Implementation of the Book Search Feature:**

- Decision: I decided to implement a robust book search feature to improve user accessibility and enable efficient content retrieval.
- Assumption: I assumed that users would benefit from a search functionality to find books based on various criteria, enhancing their overall experience.

**2. Implementation of User Authentication:**

- Decision: I incorporated user authentication to safeguard user data and provide controlled access to sensitive API endpoints.
- Assumption: I assumed that authentication is essential to ensure data privacy and security, allowing only authorized users to interact with the API.

**3. Implementation of Book Cover Image Handling:**

- Decision: I included book cover image handling to enhance the visual experience of my users by providing visual representations of books.
- Assumption: I assumed that visual content, such as book cover images, can greatly improve user engagement and book selection.

These decisions have been integral in shaping the capabilities and user-friendliness of my API. While they were based on assumptions and requirements, I will continue to validate and refine these features through testing and user feedback to ensure they meet user expectations.

# Books API Version 2

Welcome to the Books API Version 2 documentation. This API offers an enhanced experience for managing books and user interactions.

## New Features

- **User Authentication**: Securely register and log in to access the API's features.
- **Book Search**: Easily search for books within the database to find the information you need.
- **Book Cover Images**: Attach book cover images to enhance the visual representation of books.

**Note:** All new features are implemented in the `dev` branch

## Endpoints Version-2

## User Authentication

### Register a New User

Create a new user account by providing the necessary information.

- **Endpoint:** `/api/v2/auth/register`
- **Method:** `POST`
- **Request Body:**
  - `email` (string) - The user's email address.
  - `name` (string) - The user's name.
  - `password` (string) - The user's password.

### User Login

Authenticate an existing user by providing their email and password.

- **Endpoint:** `/api/v2/auth/login`
- **Method:** `POST`
- **Request Body:**
  - `email` (string) - The user's email address.
  - `password` (string) - The user's password.

### Search Books

Search for books in the database

- **Endpoint:** `/api/v2/books/search?query={}`
- **Method:** `GET`
- **Parameters:**
  - `query` (string) - The search query.

---
