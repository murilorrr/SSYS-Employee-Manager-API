<h1 align="center">
  How to install
</h1>

# Contributing

Contributions, issues and feature requests are very welcome.

## Docker

If you have docker installed, you can run with:

```sh
docker-compose up
```

## Pre-requisites

- _Node:_ `^14.16.1` or higher.
- _Npm:_ `8.3.0` or higher.
- _Git:_ `2.25.1` or higher.

## Getting started

Clone the project from Github :

```sh
git clone git@github.com:murilorsv14/SSYS-Employee-Manager-API.git
cd SSYS-Employee-Manager-API
```

Install dependencies:

```sh
$ npm install
```

Run

```bash
$ npm start
```

If everything is ok, you will be able to open at:

```bash
http://localhost:8000
```

### Backend Architecture

We decided to follow some MSC to guide our backend architecture. Here is a quick glance of what we expect when of new contributions in the backend project. How we organize our project:

- `/back-end/src`: Source of all back-end;
  - `controllers`: Is the layer that takes care of http requests to the server;
  - `services`: Is the layer that takes care of the application's business rules, it intermediates the information coming from the route to the model;
  - `database`: Is the layer that governs all the database and configs;
  - `middlewares`: Is a type of controller, but can be reused for authentication or error handling functions for example;
  - `routes`: This layer will tell which endpoint will operate for each controller;
  - `server`: Here our server is instantiated and identifies the routes and entities;
- `test`: This layer makes everything, including coffee;
- `utils`: Here are custom functions to help our application;


> This project has integration with LGTM automated code review


Thanks ❤️
