# EV-Solar Backend API

This is the backend API service for the EV-Solar app, built with **NestJS** and **TypeScript**. It provides core user management features including authentication, authorization, and basic CRUD operations.

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
