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
