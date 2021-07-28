# ProjectUberEat

There are two ways to make this application work :
* Locally with the use of Docker. The API and the two databases each running on a different container.
* By deploying the application online using Heroku and Netlify
* 
# Using Docker

## API

The API works with Docker, get into the api folder and run :

```bash
docker-compose build | docker-compose up --remove-orphans
```
This will also run the Mongo database and MySQL database. You have to run this command for every change on the API.

Both databases in both containers will be empty (which might makes the API crash), you need to import the data with the .json and .sql files provided.

## Databases

Open the MySQL container CLI, then run this command :

```bash
mysql -u root -p uber_eats < data_host/data/database.sql
```

Open the MongoDB container CLI, then run those commands:

```bash
mongoimport -d uber_eats -c articles --authenticationDatabase admin --username root --password mdptrocool --file /data_host/data/articles.json  --jsonArray

mongoimport -d uber_eats -c menus --authenticationDatabase admin --username root --password mdptrocool --file /data_host/data/menus.json  --jsonArray

mongoimport -d uber_eats -c orders --authenticationDatabase admin --username root --password mdptrocool --file /data_host/data/orders.json  --jsonArray
```

## Front

To start the front, first, install the dependencies with :

```Node
npm install
```

then run it with :

```Node
npm run serve
```

# Using Heroku and Netlify

## API

The `.env` file should look like this:
```
# DB Configurations
DB_HOST=remotemysql.com
DB_PORT=3306
DB_USER=zX45jDxbVQ
DB_PASS=8awLraf8zx
DB_DATABASE=zX45jDxbVQ
INSECURE_AUTH=true

# DB MONGODB
DB_MONGO=mongodb+srv://root:mdptrocool@project.iivmj.mongodb.net/uber_eats?retryWrites=true&w=majority
MONGO_USER=root
MONGO_PASS=mdptrocool

# local runtime configs
PORT=3000
SECRET_JWT=09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611
TOKEN_TIME=1d
```

## Databases


## Front
