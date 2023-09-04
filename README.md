### SERVER INIT INSTRUCTIONS
- Create a database with the following command:
    `create database prod_steadygrowth;`
- RUN the migrations
    `npx knex migrate:latest`
-SEED the data
    `npx knex seed:run`