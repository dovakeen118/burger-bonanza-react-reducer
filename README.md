# Burger Bonanza

This web application displays a form for a fictitious burger restaurant to handle order requests.

The learning goal of this application is to implement `useReducer`.

## Overview

Users can order multiple burgers at a time, building each burger for the order separately. Select from a dropdown the kind of burger (medium rare, medium, medium well, well done, chicken, or vegan), choose toppings (cheese, pickles, onions, lettuce), specify the type of roll (gluten-free or Hawaiian roll), and lastly, pick from available side options (salad, fries, potatoes, veggies).

Submitting the form issues a POST fetch with the burger order information and persists the order in the Postgres database.

### Technologies

- PostgreSQL
- Express
- React
- Passport

## Passport Authentication

When using this application you will need an `.env` file in the root of the `server` folder for Passport user authentication. Use the `example.env` for reference:

```env
SESSION_SECRET="123abc"
```

## Installation

Before starting the app, use `yarn` to install dependencies, create the database, and run the migrations from the `server` directory:

```sh
yarn install
cd server
createdb burger-bonanza-react-reducer_development
yarn migrate:latest
```

## Usage

From the root directory use the `yarn run dev` script to visit the application from <http://localhost:3000>

```sh
yarn run dev
```

## Future Features

- Implement separate User roles; owner vs customer
- Owners can see all orders for their restaurant
- Customers can see all of their orders
