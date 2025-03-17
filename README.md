<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

The next technical test is an user API using Mongodb connection for data management through Mongoose

The endpoints made allow the following

    - User creation

    - List all users

    - User search by ID

    - User update (except password) filtering by ID

    - User elimination, searching for ID

## Project setup

To execute the project it is necessary to have nest installed in the system
(Version used 11.0.2)

```bash
$ npm install
```

It is also necessary to have a connection to a Mongodb database (example from .env.example)

    MONGO_URI="mongodb://[domain]:[mongo_port]/db_example"


Main Dependencies: 

@nestjs/mongoose 

@nestjs/testing

@types/bcrypt

class-validator

@nestjs/mapped-types

*Local is configured to use port 3000

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

```

## Testing endpoints
POST    url/users

body request:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```
Successful response example
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2023-10-01T12:00:00Z"
}
```
------------------------------

GET    url/users 

Successful response example
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2023-10-01T12:00:00Z"
  },
  {
    "id": "uuid",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "createdAt": "2023-10-02T14:30:00Z"
  }
]
```
------------------------------------

GET     url/users/:id

    -specify id user

Successful response example
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "createdAt": "2023-10-01T12:00:00Z"
}
```
----------------------------------------

PUT     url/users/:id
    -specify id user

  body request
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```
Successful response example
```json
{
  "id": "uuid",
  "name": "John Updated",
  "email": "john.updated@example.com",
  "createdAt": "2023-10-01T12:00:00Z"
}
```
------------------------------------------

DELETE     url/users/:id
    -specify id user

Successful response example
```json
{
  "message": "User deleted successfully"
}
```

