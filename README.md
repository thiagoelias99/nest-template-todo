<h1 align="center">Nest Project Template - Todo List</h1> 

<p align="center">
<a href="https://nestjs.com/">
<img src="https://img.shields.io/badge/NestJS-Framework-red?style=for-the-badge&logo=nestjs" />
</a>
<a href="https://www.typescriptlang.org">
<img src="https://img.shields.io/badge/TypeScript-Language-blue?style=for-the-badge&logo=typescript" />
</a>
<a href="https://www.prisma.io/">
<img src="https://img.shields.io/badge/Prisma-ORM-green?style=for-the-badge&logo=prisma" />
</a>
<a href="https://www.sqlite.org/">
<img src="https://img.shields.io/badge/SQLite-Database-blue?style=for-the-badge&logo=sqlite" />
</a>
<a href="https://jestjs.io/">
<img src="https://img.shields.io/badge/Jest-Testing-red?style=for-the-badge&logo=jest" />
</a>
<a href="https://swagger.io/">
<img src="https://img.shields.io/badge/Swagger-API%20Documentation-brightgreen?style=for-the-badge&logo=swagger" />
</a>
</p>

## Introduction
This is a template developed in [NestJs](https://nestjs.com/) with typescript for the purpose to serve a start point for futures project. The app is a simple user based todo list.

### Features
- Sign up / login using JWT.
- Uses pipes for entry data schema validations.
- Uses guards for protected routes verification.
- Uses [Prisma](https://www.prisma.io/) as ORM with sqlite database.
- Units, integrations and end-to-end test with [Jest](https://jestjs.io/).
- Documentation build with [Swagger](https://swagger.io/) plugin.

## Api Documentation
- The api documentation can be accessed while running in development mode at [http://localhost:3000/api](http://localhost:3000/api)

## How to install and run this project
#### Pre-Requisites
- [NodeJs](https://nodejs.org/en) version 20 or greater.

#### Installation
- Download or clone this repository.
- In the project root folder use the command `npm install`

#### Running in development mode
1. Create a copy and rename ***.env.sample*** to ***.env.development***
2. Fill `JWT_SECRET` with some data (*string*)
    - Example: `JWT_SECRET="THISISASECRET123"`
3. Run cmd `npm run db:push` for database sync.
    - This will create the sqlite file and automatic run the migrations.
4. Run cmd `npm run dev` to start in development mode.
    - Runs default in port **localhost:3000**

#### Running in test mode
1. Create a copy and rename ***.env.sample*** to ***.env.test***
2. Fill `JWT_SECRET` with some data (*string*)
3. Optionally rename the `DATABASE_URL` file name in .env.test. 
4. Run cmd `npm run test` to initiate test.
- Unit Tests
    - Controllers
    - Services
- Integration Tests
    - Repositories
    - Guards
    - Pipes
    - Dtos
- End-to-end Tests
    - **Case 1**: Simulate a user registering in the system, login, get profile information's and update some of them.