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

The application is deployed using docker. The docker-compose.yaml file contains the configuration for the application
and the database. The application is available through an external traefik reverse proxy. The traefik configuration
is not part of this repository.

To deploy the application, the image for the SvelteKit app is built and exported. The image, docker-compose.yaml
and .env file form 'docker/finances-prod/' is then copied to the remote server, where the image is loaded and the application
is started.

The docker-compose file uses the image with the :latest tag. This is automatically set to the uploaded image when the
image is loaded. Notice: This leads to a stack of images from previous version on the remote server!

The described steps are already automated in the deploy.sh script. The commands for the remote host are defined in 
deploy-remote.sh. To adapt the scripts to your needs, you need to change the variables in the beginning of the deploy.sh
script. The used image version is be set as a script parameter.

To deploy the application, run the following command:
```shell
  sudo sh ./deploy.sh x.x.x
```
