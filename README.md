## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

steps to run 
copy.env.sql and paste it in .env file update secrets

json-server --watch db.json --port 3001

curl -X POST http://localhost:3000/ingestion/trigger \
     -H "Content-Type: application/json" \
     -d '{"someKey": "someValue"}'

http://localhost:3000/api for swagger yaml api documentation

More improvents needs to be done

Caching 

Terraform automating resources

Better CI/CD

E2E testing
