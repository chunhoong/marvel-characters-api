# Marvel Characters API

## Prerequisite

- NodeJS
- Docker
- Redis

## Getting started

To start working on this project, install the dependencies by executing:

```shell
npm install
```

By default, the configuration file is not committed into version control system. Yet you can create yours by making a
copy from the sample.

```shell
cp .env-sample .env
```

Now you may start your development server with by running:

```shell
npm start
```

## Generate a production build


```shell
docker build -t mca:latest .

# To run the server in port 9999
docker run -d -p 9999:9999 -e "PORT=9999" mca:latest
```