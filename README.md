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

## Databases

Both databases are hosted online. As they are hosted online, you can skip the databases section.

The Mongo database is hosted for free on the official Mongo website: https://cloud.mongodb.com/v2/610067f01819cf0527e3a4bc.
The MySQL database is hosted for free on https://remotemysql.com/.

You can access to the MongoDB database and fill it by using the `.json` files provided in /back/.mongo_data.
You can access to the MySQL database and fill it by using the `.sql` files provided in /back/.mysql_data.

## API

The `.env` file should look like this:
```
# DB Configurations
MYSQL_HOST=remotemysql.com
MYSQL_PORT=3306
MYSQL_USER=zX45jDxbVQ
MYSQL_PASS=8awLraf8zx
MYSQL_DATABASE=zX45jDxbVQ
MYSQL_INSECURE_AUTH=true

# DB MONGODB
MONGO_CONNECTION=mongodb+srv://root:mdptrocool@project.iivmj.mongodb.net/uber_eats?retryWrites=true&w=majority
MONGO_USER=root
MONGO_PASS=mdptrocool

# local runtime configs
PORT=3000
SECRET_JWT=09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611
TOKEN_TIME=1d
```

The API is hosted by [Heroku](https://dashboard.heroku.com/apps). From the root folder, open the CMD, log into Heroku, add a remote to the Heroku repository, and push the API there, using those commands:

```
heroku login

heroku git:remote -a uber-eats-hrk

git add . | git commit -m "changing remote" | git subtree push --prefix back heroku main
```

## Front

Access to the [Netlify](https://app.netlify.com/teams/gregoryhue/overview) website, and click "New site from Git". Link this same Github project with it, and configure it this way:
```
Base directory : front
Build command : npm run build
Publish directory : front/dist/
```

