[Markdown Cheat Sheets](https://www.markdownguide.org/cheat-sheet/)

# Application Structure (Long Term)

    AppModule (root)
        TasksModule
            TasksController
            TaksService
            TaskEntity
            Task Repository
            StatusValidationPipe

        AuthModule
            AuthController
            AuthService
            UserEntity
            UserRepository
            JwtStrategy

---

# Get Help in the console:

> nest g --help

## Schematics available on @nestjs/schematics collection:
┌───────────────┬─────────────┬──────────────────────────────────────────────┐
│ name │ alias │ description │
│ application │ application │ Generate a new application workspace │
│ class │ cl │ Generate a new class │
│ configuration │ config │ Generate a CLI configuration file │
│ controller │ co │ Generate a controller declaration │
│ decorator │ d │ Generate a custom decorator │
│ filter │ f │ Generate a filter declaration │
│ gateway │ ga │ Generate a gateway declaration │
│ guard │ gu │ Generate a guard declaration │
│ interceptor │ in │ Generate an interceptor declaration │
│ interface │ interface │ Generate an interface │
│ middleware │ mi │ Generate a middleware declaration │
│ module │ mo │ Generate a module declaration │
│ pipe │ pi │ Generate a pipe declaration │
│ provider │ pr │ Generate a provider declaration │
│ resolver │ r │ Generate a GraphQL resolver declaration │
│ service │ s │ Generate a service declaration │
│ library │ lib │ Generate a new library within a monorepo │
│ sub-app │ app │ Generate a new application within a monorepo │
│ resource │ res │ Generate a new CRUD resource │
└───────────────┴─────────────┴──────────────────────────────────────────────┘

## Options:

-d, --dry-run Report actions that would be taken
without writing out results.
-p, --project [project] Project in which to generate files.
--flat Enforce flat structure of generated
element.
--spec Enforce spec files generation. (default:
true)
--no-spec Disable spec files generation.
-c, --collection [collectionName] Schematics collection to use.
-h, --help Output usage information.

---

---

---

# Concept Definitions:

- **Controllers**: Responsible for handling request and returning responses to the client, bound to a specific path (example: "/tasks "), Defined using @Controller decorator, and handler in the controller are defined as @Get, @Post, @Delete, etcetera

### How to create a controller?

> nest g controller tasks --no-spec (without spec files)

- **Providers**: can be injected into contructorsif decorated as an @Injectable, via dependency injection, can plain value, a class sync/async factory etc. providers must be provided to a module for them to be usable. Can be exported froma module - and then be available to others modules that import it

- **what is a service?** Defined as providers (Not all providers are services). Can be implemented as singleton when wrapped with @Injectable() and provided to a module. That means, the same instance will be shared across the application acting as a single source of truth

- **Dependency Injection in NestJS**: any component within the NestJs eosystem can inject a provider that is decorated with the @Injectable

- **DTO (Data Transfer object)**. is an object that is used to encapsulate data, and send it from one subsystem of an application to another.
  Is an object that defines how the data will be sent over the network

### Classes VS Interfaces for DTOs

- - Data Transfer Objects (DTOs) can be defined as classes or interfaces.
- - The recommended approach is to use classes, also crearly documented in the NestJS documentation.
- - The reason is that interfaces are a part of TypeScript and therefore are not preserved post-compilation.
- - Classes allow us to do more, and since they are a part of JavaScript, they will be preserved post-compilation.
- - NestJS cannot refer to interfaces in run-time, but can refer to classes.

### Pipes:

- - Operate on the arguments to be processed by the route handler, just before the handler is called.
- - Can perform data transformation or data validation
- - Can return data - either original or modified - wich will passed on the route handler.
- - Pipes can throw exceptions. Exceptions throw will be handled by NestJS and parsed into an error response.
- - Pipeas can be asynchrinous.

- Default: NestJS ships with useful pipes within the **@nestjs/common** module:
- - Validation Pipe
- - ParseIntPipe

- **Custom Pipe Implementation** :

1. Pipes are classes annotated with the @Injectable() decorator

**Parameter-level VS Handler-level pipes. Which one?**

- **Parameter-level pipes**: tend to be slimmer and cleaner. However, they often result in extra code added to handlers - this can get messy and hard to mantain.
- **Handler-level pipes** require some more code, but provide some great benefits:

1. Such pipes do not require extra code at parameter level
2. Easier to maintain and expand. if the shape of data changes, it is easy to make the necessary changes withing the pipe only

3. Responsibility of identify the arguments to process shifted to one central file
4. Promote usage of DTOs which is a very good practice

### Docker - Running docker postgres image:

> docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

> docker run (run a container)
> --name postgres-nest (how to name the docker image)
> -p 5432:5432 (maping the image port number to my machine port number, in this case is the same portnumber)
> -e POSTGRES_PASSWORD=postgres (this is environment variable setting a password)
> -d postgres (is going to run in detached mode, if you run your terminal it will keep running )

- Mongodb:
  > docker container run --name dbtasks --publish 27017:27017 -d mongo

1. Create a mongodb docker container using mongo image
   > docker container run --name mydatabase --publish 27017:27017 -d mongo
2. Get access into running mongo container bash.
   > docker container exec -it mydatabase bash

(this will login you to the bash)

3. Then run mongo by typing following command. it will start the mongo shell.
   mongo
4. Create you desired database (ex: mydbone) with following command.
   use mydbone
5. Then create a user to grant privileges to your database.
   db.createUser({ user: "username", pwd: "password", roles: [] })
   this will create a user for your database and to see the users type show users on terminal. for more info : mongodb official
6. Exit from the mongo shell by typing exit command. now you are on the bash.
   exit
7. Now enable authentication to created database by typing following command on the bash.
   mongo --port 27017 -u username -p password --authenticationDatabase mydbone

8. Now enable authentication to created database by typing following command on the bash.
   mongo --port 27017 -u username -p password --authenticationDatabase mydbone
   now you should be able to connect to the mydbone database with the given username and password.

- **check list of docker images running:**
  > docker container ls
- **stop docker image:**
  > docker container stop postgres-nest
- **stop docker image:**
  > docker container stop postgres-nest

## NestJs - Object Relational Mapping (ORM)

- - **Object-Relational Mapping (ORM)** is a techinque that lets you query and manipulate data from a database, using an object-orientend paradigm.
- - there are many ORM lubraries that allow developers to communicate to the database using their preferred programming language - rather than sending plain queries directly

### Pros and cons of using ORM library:

- - **Pros**.- Writing the data model in one place - easier to mainain. less repetition.
- - Lots of things done automatically - database handling, data types, relations etcetera.
- - No need to write a SQL syntax (easy to learn, hard to master). Using your natural way of coding
- - Database abstraction - you can change the database type whenever you wish
- - leverages OOP, therefore things like inheritance are asey to achieve

- - **Cons**.- You have to learn it, and ORM libraries are not always simple.
- - Performance is alright, but it´s easy to neglect.
- - Makes it easy to forget (or never learn) what´s happening behind the scenes, which can lead to a variety of maintainability issues

### TypeORM

- - TypeORM is an ORM library that can run in Node.js and be used with TypeScript (or Javascript)

- - Helps us to define and manage entities, repositories, columns, relations, replication, indices, queries, logging and so much more.
- - **Example**: Retrieving all taks owned by "Ashley" and are of status "done"

` -- TypeORM: const tasks = await Task.find({ status: 'DONE', user:'Ashley' })`

` --Pure JavaScript:
let tasks;
db.query('SELECT \* FROM tasks WHERE status = "DONE" AND user= "Ashley", (err,result)=>{
if(err){
throw new Erro('Could not retrieve tasks!')
}
tasks= result.rows;
} ');

`

---

## Install typeORM:

- npm install typeorm @nestjs/typeorm pg

**Hash**.- one way function, securely storing passwords

- when you hash a password when creating a user, and try to login, you are replicating the hash, if it match we may be able to login

username: edsonmaciel ---> salted: df23refsdfs_edsonmaciel
pasword: Pass1234 ----> hashed: (salted_hashed) 123dsfsdfwe_23sdfsdf23ef

**JSON Web Tokens**

- Open-source Industry Standard (RFC-7519)
- Usable for authorization or secure exchange of information between parties
- Verify that the sender is who is/he/she claims to be

### JWT Structure

- Header.- Contains metadata abou the token (type, hashing algorithm etc)
- Payload.- contains claims (statements about an entity - for example, a user and additional data)
- Signature is the result of the encoded header, the encoded payload, signed against a secret (a secret that only we known)

JSON Web Token can be decoded by anyone. They Should not contain sensitive information such as passwords

it is useful for front-end applications to use these tokens to toggle

## Create a database relation

## Logging Process

### Types of logs

1. Log - General pupose logging of important information
2. Warning- unhandled issue that is not a fatal or destructive
3. Error - unhandled issue that is fatal or destructive
4. Debug - useful information that can help us debug the logic in case of error/ warning. Intended for developers
5. Verbose - Information providing insights about the behaviour of the application. Intended for operators (for example, support), usually "too much information"

#### Log levels

- develop (log, error, warning, debug, verbose)
- staging (log, error, warning)
- production (log, error)

#### advanced libraries:

https://github.com/winstonjs/winston
https://www.npmjs.com/package/bunyan
https://www.npmjs.com/package/bino?activeTab=explore

# Configuration

- Central way of defining values that are loaded upon starting the application (should not be changed during runtime).
- Configuration per environment - development, staging, production etc
- Configuration can be deined into the code base. Useful if you work with multiple developers via version control
- Can be defined as many ways (JSON, YAML, XML, Envoriment Variables, etc), using solutions or open-source libraries

## Codebase VS Environment Variables

- You could define configurations in your codebase. For example, in a config folder.
- You could also support configuring values via environment variables (which are provided when running the application)

- **Example:**

  - Non-sensitive information such as the port to run the application on, will be defined in the code base.
  - Sensitive information such a database username and password for production mode, will be provided via environment variables upon runnig th application

  - using cross-env globally: > npm install -g cross-env

  ### Continuing further

- Following this section, you will end up adding environment variables to your package.json scripts.

- For example, in the lecture "Setting up ConfigModule", you will end up with:

- "start:dev": "STAGE=dev nest start --watch",

- You will need to add "cross-env" to that script, otherwise it will not work. So the final result should be:

- "start:dev": "cross-env STAGE=dev nest start --watch",

- And this should be the case for every script you have in your package.json that requires env variables (in this course we do start:dev, start:debug, start:prod, and test.

### Environment Variables

- Global nodeJs env variables : process.env
- how to define it: MY_VARIABLE="myvalue" npm run start:dev

### Config schema validation

- install > npm install @hapi/joi
- adding the types: > npm install -D @types/hapi\_\_joi

- create a ./ config.schema.ts --> we are going to define our schema

## JWT Secret configuration

- generate the secret using this page: https://passwordsgenerator.net/

## Consuming API with a frontend application

- **Repo:** https://github.com/arielweinberger/task-management-frontend
  -- alternative : https://github.com/llaenowyd/next-task-management
