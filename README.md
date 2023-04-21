# Finances Tracker

This is a simple finances tracker that I use to keep track of my finances.

# Getting started

1. Start the PostgreSQL database. It will be the backbone of our application and locally available on port 5432. The
   setup is provided using docker. The credentials can be found in the docker-compose.yaml file.
   ```shell
   cd docker/finances-dev
   docker compose up -d
   cd ../..
   ```

2. Install the npm dependencies:
   ```shell
   npm install
   ```

3. After installing the dependencies, you need to apply the database migrations and generate the prisma client.
   The initial migrations set up the database scheme for the Lucia authentication. Prisma then generates the client
   based on the database model to provide typed access to the database.
   ```shell
   npx prisma migrate deploy # apply the database migrations 
   npx prisma generate # generate the prisma client
   ```

4. Finally, start the development server:
   ```shell
   npm run dev
   ```
   
5. To access the application, open the following URL in your browser: http://localhost:3000
   Create an account to access the application. On the account page, you can generate some sample data.
   Now explore the application and customize it to your needs.

# Deployment

Yet, there is no deployment setup. I am planning to deploy the application to my server in the near future
and will share the setup and configuration when it's done.
