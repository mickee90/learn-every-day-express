A web based learning application built with NodeJs / Express

The Vue client code can be found here: 
https://github.com/mickee90/learn-every-day-vue

# Setup 

```
npm install
```

Create a local mysql database with the name learn-every-day

Copy .env_example to .env and update the database info

Run migrations and seed data: 
```
sequelize-cli db:migrate && sequelize-cli db:seed:all
```

Start the server: 
``` 
npm run compile
```

## E2E tests with Cypress
#### If you want to run E2E test with Cypress in the front end, make sure run the same Backend setup as above, but name the database learn-every-day-testing and then: 

```
sequelize-cli db:migrate --env test && sequelize-cli db:seed:all --env test
npm run compile-testing
```
