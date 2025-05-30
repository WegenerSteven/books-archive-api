# Books Archive Management System API

A robust Books Archive Management System API built with **NestJS** and **TypeORM**, designed with clean architecture principles, the Repository Pattern, and enterprise-level best practices.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Core Entities](#core-entities)
- [Entity Relationships](#entity-relationships)
- [Validation](#validation)
- [API Endpoints](#api-endpoints)
- [Seeding & Migrations](#seeding--migrations)
- [Error Handling](#error-handling)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This API is a digital archive for managing books, authors, categories, user profiles, and book reviews. It is suitable for libraries, bookstores, or personal collections, and demonstrates production-grade application patterns such as:

- **Repository Pattern** for data access abstraction
- **DTOs (Data Transfer Objects)** for all endpoints
- **Class-validator** for request validation
- **Comprehensive entity relationships**
- **Global exception filters** for error handling

---

## Features

- User management with profiles
- Author and book management
- Book categorization (many-to-many)
- Book reviews and ratings
- Role-based access support (extensible)
- Advanced search by title, author, or category
- RESTful API with proper status codes
- Global error responses
- Database seeding for development

---

## Architecture

- **NestJS** framework for scalable modules and dependency injection
- **TypeORM** for ORM/database operations and migrations
- **PostgreSQL** as the primary database
- **Repository Pattern** for clean separation of concerns
- **DTOs** to enforce data contracts
- **Validation** via `class-validator`
- **Entities** and **relationships** mapped with TypeORM decorators

---

## Core Entities

| Entity        | Fields                                                                                               |
|---------------|-----------------------------------------------------------------------------------------------------|
| **User**      | id, name, email, password, isActive, createdAt, updatedAt                                           |
| **Profile**   | id, bio, avatar, dateOfBirth, location                                                              |
| **Author**    | id, name, bio, birthDate, isActive                                                                  |
| **Book**      | id, title, description, publicationYear, isAvailable                                                |
| **Category**  | id, name, description                                                                               |
| **BookReview**| id, content, rating, createdAt                                                                      |

---

## Entity Relationships

- **User ↔ Profile**: One-to-One
- **User ↔ BookReview**: One-to-Many
- **Author ↔ Book**: One-to-Many
- **Book ↔ BookReview**: One-to-Many
- **Book ↔ Category**: Many-to-Many

All relationships are implemented using TypeORM decorators with proper foreign key configuration.

---

## Validation

All DTOs enforce strict validation with class-validator:

### User
- **name**: Required, 2–50 chars, alphanumeric + spaces
- **email**: Required, valid email, unique
- **password**: Required, min 8 chars, 1 uppercase, 1 lowercase, 1 number

### Author
- **name**: Required, 2–100 chars
- **bio**: Optional, max 1000 chars
- **birthDate**: Optional, valid date, not in the future

### Book
- **title**: Required, 1–200 chars
- **description**: Required, 10–2000 chars
- **publicationYear**: Required, between 1000 and current year

### Category
- **name**: Required, 2–50 chars, unique
- **description**: Optional, max 500 chars

### BookReview
- **content**: Required, 10–1000 chars
- **rating**: Required, integer 1–5

---

## API Endpoints

### User Endpoints
- `GET /users` — List all users
- `POST /users` — Create new user
- `GET /users/:id` — Get user by ID
- `PUT /users/:id` — Update user
- `DELETE /users/:id` — Delete user

### Author Endpoints
- `GET /authors`
- `POST /authors`
- `GET /authors/:id`
- `PUT /authors/:id`
- `DELETE /authors/:id`
- `GET /authors/:id/books` — Get books by author

### Book Endpoints
- `GET /books`
- `POST /books`
- `GET /books/:id`
- `PUT /books/:id`
- `DELETE /books/:id`
- `GET /books/search?title=&author=&category=` — Advanced book search
- `POST /books/:id/reviews` — Add review to book

### Category Endpoints
- `GET /categories`
- `POST /categories`
- `GET /categories/:id`
- `PUT /categories/:id`
- `DELETE /categories/:id`
- `GET /categories/:id/books` — Get books in category

### BookReview Endpoints
- `GET /reviews`
- `GET /reviews/:id`
- `DELETE /reviews/:id`

---

## Seeding & Migrations

- Use provided scripts for database migrations and seeding.
- Migrations: `npm run typeorm migration:run`
- Seeding: `npm run seed`

---

## Error Handling

- All errors are handled using global exception filters.
- Custom error responses follow a consistent format.

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/WegenerSteven/books-archive-api.git
   cd books-archive-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Copy `.env.example` to `.env` and set up your PostgreSQL credentials.

4. **Run migrations and seed data**
   ```bash
   npm run typeorm migration:run
   npm run seed
   ```

5. **Start the API**
   ```bash
   npm run start:dev
   ```

---

## Project Structure

```
src/
  modules/
    users/
    profiles/
    authors/
    books/
    categories/
    reviews/
  common/
  database/
  main.ts
```

- **modules/**: Feature modules for each entity
- **common/**: Shared utilities, filters, DTOs
- **database/**: ORM configuration, migrations, seeders

---

## Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add awesome feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## License

[MIT](./LICENSE)
