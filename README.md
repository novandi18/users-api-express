# Users Management API

Users Management API is a RESTful service built with Node.js, Express, and TypeScript. It provides CRUD operations for users, integrates with MySQL, and offers API documentation via Swagger.

## Features

- **CRUD Operations:** Create, Read, Update, Delete users.
- **Database Integration:** Uses MySQL for persistent storage.
- **TypeScript:** Strongly typed codebase for better maintainability.
- **Swagger Documentation:** Interactive API documentation.
- **Docker Support:** Containerized for easy deployment.
- **Testing:** Comprehensive testing with Jest.

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/novandi18/users-api-express.git
   cd users-api-express
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create an `.env` file:**

   ```plaintext
   # Database
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=db_users

   # Server
   PORT=3000
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Build the project:**

   ```bash
   npm run build
   ```

6. **Run tests:**

   ```bash
   npm test
   ```

## Usage

- Access the API at `http://localhost:3000/api`.
- View API documentation at `http://localhost:3000/docs`.

## Contributing

Feel free to open issues or submit pull requests for improvements.

## License

This project is licensed under the ISC License.

## Author

**Novandi Ramadhan**
