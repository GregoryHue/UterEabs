# ProjectUberEat

## API

The API works with Docker, get into the api folder and run :

```Docker
docker compose build | docker compose up
```
This will also run the Mongo database and MySQL database. You have to run this command for every change on the API.

Both databases on both containers will be empty, you need to import the data with the .json and .sql files provided.

## Import data into MySQL container

## Import data into MongoDB container

## Front

To start the front, first, install the dependencies with :

```Node
npm install
```

then run it with :

```Node
npm run serve
```

