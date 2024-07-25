## Info
This is a demo project to support a medium article


To run this project

1. Create a .env in the backend root
```
DB_DIALECT=postgres
DB_PORT=5432
DB_HOST=localhost
DB_DATABASE=login
DB_USERNAME=username
DB_PASSWORD=password
```

2. spin up and run a postgres instance mathcing the port and host in your .env

3. run  ```npm run dev``` on backend to spin up the backend server

4. run ```npm run build && npm start``` on frontend


Now, you will be able to create a user by running the createUser graphQL query. To update the user to active and actually access the dashboard, run a SQL command in the postgres instance to update the active field to true once you have create a user.