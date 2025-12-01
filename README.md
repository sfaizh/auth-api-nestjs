# Backend API for user authentication

This is the backend API service for my ev-solar app, built with **NestJS** and **TypeScript**. It serves as a simple example of user authentication, authorization (roles) and basic CRUD operations to a MySQL database.

## Features

- User registration and login
- JWT-based authentication and refresh token support
- Secure route protection with guards
- Full CRUD operations for user data
- Built with NestJS and TypeScript

## Stack

- [NestJS](https://nestjs.com/) – Node.js framework
- JWT – authentication *(configure in `.env`)*
- MySQL via TypeORM *(configure in `.env`)*

## Installation

```bash
# clone the repo
git clone https://github.com/sfaizh/auth-api-nestjs.git
cd auth-api-nestjs

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

- **GET** `/user`  
  Retrieves all users.

- **GET** `/user:id`  
  Retrieves user by id

- **PUT** `/user:id`  
  Updates a user

- **DELETE** `/user:id`  
  Deletes a user
