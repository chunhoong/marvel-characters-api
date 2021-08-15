# Marvel Characters API
Marvel Characters API (MCA), powered by official Marvel Comics API.

## Prerequisite

- NodeJS
- Docker
- Redis

## Getting started

1. To start working on this project, install the dependencies by executing:

    ```shell
    npm install
    ```

2. MCA can be configured by using `.env` file. However, `.env` is not committed into version control system. Yet you can create yours by making a
copy from `.env-sample`.


3. Now you may start your development server with by running:

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