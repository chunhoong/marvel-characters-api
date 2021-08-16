# Marvel Characters API

Marvel Characters API (MCA), powered by official Marvel Comics API.

## Prerequisite

- NodeJS
- Docker
- Marvel Comics API developer account

## Getting started

1. Provision local redis using docker-compose:
   
   ```shell
   docker-compose up -d
   ```

2. Install the project dependencies:

    ```shell
    npm install
    ```

3. MCA can be configured by using `.env` file. However, `.env` is not committed into version control system. Yet you can
   create yours by using `.env-sample` as reference.


4. Now you may start your development server by running:

    ```shell
    npm start
    ```

## Generate a production build

MCA is packaged into a Docker image for production:

```shell
docker build -t mca:latest .
```