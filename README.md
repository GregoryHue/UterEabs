# ProjectUberEat

There is two ways to make this application work :
* Locally with the use of Docker. The API and the two databases each running on a different container.
* By deploying the application online using Heroku and Netlify

##### Table of Contents


[Using Docker](#Using Docker) 

[API](#API) 

[Databases](#Databases) 

[Front](#Front) 

[Errors](#Errors) 

### API

The API works with Docker, get into the api folder and run :

```bash
docker-compose build | docker-compose up --remove-orphans
```
This will also run the Mongo database and MySQL database. You have to run this command for every change on the API.

Both databases in both containers will be empty (which might makes the API crash), you need to import the data with the .json and .sql files provided.

### Databases

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

### Front

To start the front, first, install the dependencies with :

```Node
npm install
```

then run it with :

```Node
npm run serve
```

### Errors

### "code: 'ER_NOT_SUPPORTED_AUTH_MODE', errno: 1251,"

Get into the MySQL container CLI, then run this command :

```bash
mysql -u root -p mysql -e " ALTER USER 'root'@'localhost' IDENTIFIED BY 'mdptrocool'; 
                            ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mdptrocool';
                            FLUSH PRIVILEGES;"
```
