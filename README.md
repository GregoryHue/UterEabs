# Description

This project is purely for educational purposes. The idea was to create a web-application in the type of Uber Eats, and deploy it. There are 3 actors :

* The `client`, who create his order with articles and menus
* The `restaurant`, who propose its articles and menus to purchase for the client
* The `delivery man`, who deliver the order to the client

For now, only the `restaurant` part has been covered.


To visit the deployed version, visit this [link](https://uter-eabs-nlf.netlify.app) and try to connect as `restaurant1@gmail.com:password`

Note: it's possible that logging in takes about 30 seconds as the SQL database needs to boot.

# UterEabs

There are two ways to make this application work :

* Locally with the use of Docker. The API and the two databases each running on a different container.
* By deploying the application online  using Heroku and Netlify (inspired by [this](https://dev.to/stlnick/how-to-deploy-a-full-stack-mern-app-with-heroku-netlify-ncb))

# Using Docker

## API

The `.env` file should look like this:
```
# MySQL
MYSQL_HOST=10.5.0.2
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASS=mdptrocool
MYSQL_DATABASE=uter_eabs
MYSQL_INSECURE_AUTH=true

# MongoDB
MONGO_CONNECTION=mongodb://10.5.0.3:27017/uter_eabs?authSource=admin
MONGO_USER=root
MONGO_PASS=mdptrocool

# local runtime configs
PORT=3000
SECRET_JWT=09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611
TOKEN_TIME=1d
```

The API works with Docker, get into the api folder and run :

```bash
docker-compose build | docker-compose up --remove-orphans
```
This will also run the Mongo database and MySQL database. You have to run this command for every change on the API.

Both databases in both containers will be empty (which might makes the API crash), you need to import the data with the `.json` and `.sql` files provided.

## Databases

Open the MySQL container CLI, then run this command :

```bash
mysql -u root -p

CREATE DATABASE uter_eabs;

mysql -u root -p uter_eabs < data_host/data/database.sql
```

Open the MongoDB container CLI, then run those commands:

```bash
mongo -u root

db.createCollection("uter_eabs")

mongoimport -d uter_eabs -c articles --authenticationDatabase admin --username root --password mdptrocool --file /data_host/data/articles.json  --jsonArray

mongoimport -d uter_eabs -c menus --authenticationDatabase admin --username root --password mdptrocool --file /data_host/data/menus.json  --jsonArray

mongoimport -d uter_eabs -c orders --authenticationDatabase admin --username root --password mdptrocool --file /data_host/data/orders.json  --jsonArray
```

## Front

Make sure the `/front/src/plugins/connection.js` file contains the following variable (notice the `http` instead of `https`):

```js
const adr = 'http://localhost:3000/';
```

To start the front, first, install the dependencies with :

```Node
npm install
```

then run it with :

```Node
npm run serve
```

# Using Heroku and Netlify

## Databases

Both databases are hosted online. As they are hosted online, you can skip the databases section.

The Mongo database is hosted for free on the official Mongo website: https://cloud.mongodb.com/v2/610067f01819cf0527e3a4bc. You can access to the MongoDB database and fill it by using the `.json` files provided in `/back/.mongo_data`.

The MySQL database is hosted for free on https://remotemysql.com/. You can access to the MySQL database and fill it by using the `.sql` files provided in `/back/.mysql_data`.

Note: the MySQL database's name is randomly generated, and can't be changed, as oppose to the Docker solution where it's still called `uter_eabs`.

## API

The `.env` file should look like this:
```
# MySQL
MYSQL_HOST=remotemysql.com
MYSQL_PORT=3306
MYSQL_USER=zX45jDxbVQ
MYSQL_PASS=8awLraf8zx
MYSQL_DATABASE=zX45jDxbVQ
MYSQL_INSECURE_AUTH=true

# MongoDB
MONGO_CONNECTION=mongodb+srv://root:mdptrocool@project.iivmj.mongodb.net/uter_eabs?retryWrites=true&w=majority
MONGO_USER=root
MONGO_PASS=mdptrocool

# local runtime configs
PORT=3000
SECRET_JWT=09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611
TOKEN_TIME=1d
```

The API is hosted by [Heroku](https://dashboard.heroku.com/apps) on a project called `uter-eabs-hrk`. From the `root` folder, open the CMD, log into Heroku, add a remote to the Heroku repository, and push the API there, using those commands:

```
heroku login

heroku git:remote -a uter-eabs-hrk

git add . | git commit -m "Heroku update" | git push origin main | git subtree push --prefix back heroku main
```

## Front

Make sure the `/front/src/plugins/connection.js` file contains the following variables (notice the `https` instead of `http`):

```js
const adr = 'https://uter-eabs-hrk.herokuapp.com/';
```

The front is hosted by [Netlify](https://app.netlify.com/teams/gregoryhue/overview) on a project called `uter-eabs-nlf`. Go to their website and log in, click on "New site from Git", then link this very same Github project with it, and configure it this way:

```
Base directory : front
Build command : npm run build
Publish directory : front/dist/
```

