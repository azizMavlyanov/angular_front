# Blog Post (Frontend)

## Demo version: [Demo](https://yourstudentvoice.herokuapp.com/home)

## Backend

Link to backend repository: [backend link](https://github.com/azizMavlyanov/laravel-back)

## Author

Aziz Mavlyanov

## Stack

HTML, CSS, JavaScript, Angular, Docker, Travis CI/CD, Heroku

## Testing, Build and deployment stages

1\) The first stage starts with pushing changes to the repository

2\) After pushing the changes Travis CI/CD starts working on the project, using [.travis.yml](https://github.com/azizMavlyanov/angular_front/blob/master/.travis.yml) configuration file for Travis.

3\) Travis CI/CD sets up such necessary technologies like Node.js, Docker and other dependencies for testing, build and deployment.

4\) Travis CI/CD arranges authentication in Docker and Heroku, using such Travis environment variables like **$DOCKER_PASSWORD, $DOCKER_USERNAME, $HEROKU_LOGIN, $HEROKU_API_KEY**. These environment variables predefined in the Travis account for these project and available for only owner of the project.

5\) Travis CI/CD runs tests before building.

6\) After successfully passed tests Travis CI/CD starts building the project as Docker image, using [Dockerfile](https://github.com/azizMavlyanov/angular_front/blob/master/Dockerfile). **\$API_UR** environment variable predefined in the Travis account.

7\) Travis CI/CD sets up docker image alias for heroku registry. **\$HEROKU_APP** environment variable predefined in the Travis account.

8\) Travis CI/CD pushes built image to docker and heroku registries.

9\) Travis CI/CD deploys the project, using built image from heroku registry to heroku production server.
