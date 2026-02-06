Vehicle Rental Platform (Backend)

A backend application built with Node.js, TypeScript, Express, and MongoDB that allows users to list vehicles for rent and rent available vehicles for one day, following SOLID principles, Repository Pattern, and class-based architecture.

✨ Features

🔐 Authentication

    -User registration

    -User login with JWT

    -Logout functionality

    -Protected routes

🚘 Vehicle Management

    -Authenticated users can add vehicles

    -Public list of available vehicles

    -Vehicle availability tracking

📦 Vehicle Rental

    -Authenticated users can rent an available vehicle

    -Rental duration is 1 day

    -Vehicle becomes unavailable once rented

    -Automatic vehicle release after 24 hours using a cron job


Key Design Principles

    -SOLID principles

    -Repository Pattern

    -Dependency Injection

    -Class-based OOP design

    -Type-safe models and entities


Project Structure

    src/
    ├── app.ts
    ├── config/
    │   └── db.ts
    ├── controllers/
    ├── services/
    ├── repositories/
    ├── entities/
    ├── interfaces/
    ├── models/
    ├── middlewares/
    ├── routes/
    ├── jobs/
    │   └── rentalExpiryJob.ts
    └── utils/


⚙️Tech Stack

    -Node.js

    -TypeScript

    -Express

    -MongoDB + Mongoose

    -JWT (jsonwebtoken)

    -bcrypt

    -node-cron

