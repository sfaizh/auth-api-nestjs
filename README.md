# Backend API for user authentication

This is the backend API service for my ev-solar app, built with **NestJS** and **TypeScript**. It provides core user management features including authentication, authorization, and basic CRUD operations.

## Features

- User registration and login
- JWT-based authentication and refresh token support
- Secure route protection with guards
- Full CRUD operations for user data
- Built with NestJS and TypeScript

## Stack

- [NestJS](https://nestjs.com/) – Node.js framework
- TypeScript – static typing
- JWT – authentication *(configure in `.env`)*
- MySQL via TypeORM *(configure in `.env`)*

## Installation

```bash
# clone the repo
git clone https://github.com/your-username/ev-solar-backend.git
cd ev-solar-backend

# install dependencies
npm install

# setup environment variables
touch .env
# edit .env with DB credentials and JWT secrets
```

# Endpoints

## Authentication

- **POST** `/auth/register`  
  Registers a new user.

- **POST** `/auth/login`  
  Authenticates a user and returns access and refresh tokens.

- **POST** `/auth/refresh`  
  Provides a new access token using a valid refresh token.

- **POST** `/auth/logout`  
  Logs out the user and invalidates the refresh token.

## User Management

- **GET** `/users/me`  
  Retrieves the authenticated user's profile.

- **PUT** `/users/me`  
  Updates the authenticated user's profile.

- **DELETE** `/users/me`  
  Deletes the authenticated user's account.
