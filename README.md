# NestJS Hexagonal Architecture

A NestJS user API structured as hexagonal architecture (ports and adapters). The user feature is the only bounded context. Business rules live in the domain, application use cases orchestrate them, and HTTP and storage sit on the outside.

## What hexagonal architecture means here

The domain sits in the center and does not know about NestJS, HTTP, or a database. Everything else depends inward.

The application layer talks to the outside world through **ports**: interfaces it owns. Concrete **adapters** implement those ports. Swapping storage means writing a new adapter and changing the Nest provider. Use cases and the `User` entity stay the same.

```
HTTP request
    │
    ▼
presentation          UserController
    │ calls
    ▼
application           use cases ──depends on──▶ UserRepositoryPort
    │ uses                                      (port, defined here)
    ▼
domain                User, Email, UserId
    ▲
    │ implements
infrastructure        inMemoryUserRepository
```

| Layer | Folder | Responsibility | Depends on |
| --- | --- | --- | --- |
| Domain | `src/user/domain` | Entities, value objects, and invariants | Nothing outside the domain |
| Application | `src/user/application` | Use cases and the repository port | Domain |
| Infrastructure | `src/user/infrastructure` | Adapters that fulfill ports | Application ports and domain types |
| Presentation | `src/user/presentation` | HTTP controller that calls use cases | Application use cases |

`UserModule` is the composition root. It registers each use case and binds the `USER_REPOSITORY` token to `inMemoryUserRepository`.

## Project layout

```
src/
├── main.ts
├── app.module.ts
└── user/
    ├── user.module.ts
    ├── domain/
    │   ├── entities/user.entity.ts
    │   └── value-objects/
    │       ├── email.vs.ts
    │       └── user-id.vo.ts
    ├── application/
    │   ├── ports/user.repository.port.ts
    │   └── use-cases/
    │       ├── create-user.use-case.ts
    │       ├── update-user.use-case.ts
    │       ├── delete-user.use-case.ts
    │       ├── get-user-use.case-by-id.ts
    │       ├── get-user-by-email.use-case.ts
    │       └── get-all-users.use-case.ts
    ├── infrastructure/
    │   └── adapters/in-memory-user.repository.ts
    └── presentation/
        └── user.controller.ts
```

## Domain

`User` is created through `User.create`. That factory checks the name (at least two characters) and wraps the email in an `Email` value object. `Email` rejects values that do not contain `@`. `UserId` generates a UUID when none is supplied.

Behavior stays on the entity: `updateName`, `updateEmail`, and `getAccountAge`. Callers read state through getters. There is no ORM model and no HTTP type in this folder.

## Application

Each use case is one class with an `execute` method. They depend on `UserRepositoryPort`, injected with the `USER_REPOSITORY` symbol, not on the in-memory class.

The port declares what persistence must do:

- `save`
- `findById`
- `findByEmail`
- `findAll`
- `delete`

`CreateUserUseCase` is the clearest example of the rule. It asks the port whether the email already exists, builds a `User` through the domain factory, then saves through the port. Duplicate-email rejection and name validation do not live in the controller or the repository.

## Infrastructure

`inMemoryUserRepository` implements `UserRepositoryPort` and stores users in a `Map`. Data disappears when the process stops. A Postgres or Mongo adapter would implement the same interface and be swapped in `UserModule`:

```ts
{
  provide: USER_REPOSITORY,
  useClass: inMemoryUserRepository,
}
```

## Presentation

`UserController` is the driving adapter. It accepts HTTP, calls a use case, and maps a `User` to a response (`id`, `name`, `email`, timestamps, `accountAge`). A missing user becomes a `404`.

| Method | Path | Use case |
| --- | --- | --- |
| `POST` | `/users` | `CreateUserUseCase` |
| `GET` | `/users` | `GetAllUsersUseCase` |
| `GET` | `/users/:id` | `GetUserByIdUseCase` |
| `GET` | `/users/by-email/:email` | `GetUserByEmailUseCase` |
| `PATCH` | `/users/id` | `UpdateUserUseCase` |
| `DELETE` | `/users/:id` | `DeleteUserUseCase` |

The app listens on `PORT`, or `3000` when that variable is unset.

## Create-user flow

1. `POST /users` hits `UserController.createUser`.
2. The controller calls `CreateUserUseCase.execute`.
3. The use case loads any existing user by email through `UserRepositoryPort`.
4. `User.create` validates the name and email and assigns an id.
5. The use case saves through the port. Nest has wired that port to `inMemoryUserRepository`.
6. The controller maps the entity to JSON.

## Run

```bash
pnpm install
pnpm run start:dev
```

```bash
pnpm run start        # one-shot
pnpm run start:prod   # node dist/main, after pnpm run build
pnpm run test
pnpm run test:e2e
```
