# Marvel Characters API

Marvel Characters API (MCA), powered by official Marvel Comics API.

## Prerequisite

- NodeJS
- Docker

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
   create yours by making a copy from `.env-sample`.


4. Now you may start your development server by running:

    ```shell
    npm start
    ```

## Generate a production build

MCA is packaged into a Docker image so it can be provisioned as container.

```shell
docker build -t mca:latest .

# To run the server in port 9999
docker run -d -p 9999:9999 -e "PORT=9999" mca:latest
```