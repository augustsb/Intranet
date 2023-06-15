# Intranet

This repository contains a minimal skeleton application (new product template, with code and tooling pre-configured).
This is a monorepo with an Express server, PostgreSQL database, and a React+Redux frontend. Both the frontend and
backend use TypeScript. The repo includes:

- [React](https://react.dev/) for the GUI layer, including Oliasoft's reusable
[React UI Library](https://oliasoft-open-source.gitlab.io/react-ui-library/#/) components
- [Redux Toolkit](https://redux-toolkit.js.org/) for the frontend data layer, with a custom API middleware for HTTP 
calls
- [Vite](https://storybook.js.org/docs/react/builders/vite) for faster frontend builds
- [Storybook](https://storybook.js.org/) for GUI component testing and documentation (configured with
    [Vite support](https://storybook.js.org/blog/first-class-vite-support-in-storybook/))
- Oliasoft's [translation package](https://gitlab.oliasoft.com/oliasoft/translation)
- [Vitest](https://vitest.dev/config/) for unit testing (similar syntax to Jest)
- [Express](https://expressjs.com/) for the server, which is built with
[TSC](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- Oliasoft's [Node PostgreSQL migrator](https://gitlab.com/oliasoft-open-source/node-postgresql-migrator) tool for
database migration scripts
- [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) for formatting and linting
- Oliasoft infrastructure configuration including Gitlab CI/CD pipelines

When starting on feature development, the example components and database table should be removed.

## Requirements

- Docker
- NodeJS >= v18.7.0
- yarn >= 1.22.19

## Setup

### Install the packages:

```bash
yarn install
```

### Create a configuration file

This file is not committed to git, and contains config options.

```bash
# srvconf-development.json
{
  "database_connection_string": "postgres://postgres:<your_password>@localhost:<docker_compose_port>/example_application",
  "database_connection_string_migrator": "postgres://postgres:<your_password>@localhost:<docker_compose_port>/example_application",
  "log_query": true
}
```

>Note: <br>
In local environment you can have same database connection string, meaning one db user for both user and migrator.<br>
However, in Test and Prod those are different users:<br>
<em>Migrator user - has all access in the database</sup><br>
<em>Normal user - has only CRUD operations access</sup>

### Generate translations

```bash
yarn generate:translation:json
```

## Server (backend)

### Run API services

The first time, run it with password that will be created for PostgreSQL:

```bash
POSTGRES_PASSWORD=<your_password> yarn services
```

After that you can run services normally:

```bash
yarn services
```

### Run database migrations

This will execute the SQL migration files which are stored in `src/server/db/migrations` (use for changes to database
schema and seed data):

```bash
yarn migrator
```

### Run API server

```bash
yarn server:dev
```

### URLs

- Server will be available on http://localhost:9011
- Healthz URL - GET http://localhost:9011/healthz
- Swagger API docs - GET http://localhost:9011/api-docs

### Comments

Use `host.docker.internal` instead of `localhost` in order to run image locally and be able to connect to the local DB

## Client (frontend)

For development, use the frontend dev server (fast in-memory development server, with hot-module replacement):

```bash
yarn run client:dev
```

For production builds (writes transpiled, bundled, and minified code to the `client-dist` directory - the `preview`
command spins up static web server for testing the production build):

```bash
yarn run client:build
yarn run client:preview
```

### Storybook

For testing and documenting reusable React components, use [Storybook](https://storybook.js.org/):

```bash
yarn storybook:dev
```

To build a static Storybook website (Storybook "production build"):

```bash
yarn storybook:build
yarn storybook:preview
```

## Testing

To run only the unit tests:

```bash
yarn test:unit
```

To include coverage reports:

```bash
yarn test:unit:coverage
```

To run the full pre-merge test suite (includes linting and formatting checks)

```bash
yarn test
```

## Linting and formatting

[Prettier](https://prettier.io/) is used to enforce a consistent code style (formatting). There are manual commands, and
a pre-commit hook to enforce this. You can also configure your IDE to reformat upon save.

```bash
yarn prettier:check # check whether files are formatted properly
yarn prettier:fix # automatically reformat files according to rules
```

[ESLint](https://eslint.org/) is used to check and enforce syntax rules. The initial rules are based on
[Airbnb's template](https://www.npmjs.com/package/eslint-config-airbnb) and
[React rules](https://www.npmjs.com/package/eslint-plugin-react). The configuration also uses the ESLint
[TypeScript parser](https://www.npmjs.com/package/@typescript-eslint/parser). The project is allowed to adapt the
ruleset according to needs.

```bash
yarn lint:check # check whether files have linting issues
yarn ling:fix # automatically fix lint issues (when possible)
```
