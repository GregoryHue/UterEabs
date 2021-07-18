##### Table of Contents  
[Headers](#headers)  
[Emphasis](#emphasis)  
...snip...    
<a name="headers"/>
## Headers


# ProjectUberEat

## API

The API works with Docker, get into the api folder and run :

```bash
docker-compose build | docker-compose up -d --remove-orphans
```
This will also run the Mongo database and MySQL database. You have to run this command for every change on the API.

Both databases on both containers will be empty (which might makes the API crash), you need to import the data with the .json and .sql files provided.

## Import data into MySQL

### Import data MySQL

Open the MySQL container CLI, then run this command :

```bash
mysql -u root -p uber_eats < data_host/data/database.sql
```


## Import data into MongoDB

### Import data MongoDB

Open the MongoDB container CLI, then run this command several time, make sure to change the -c and --file parameters for each collection/json file. (articles, menus, orders):

```bash
mongoimport -d uber_eats -c [CollectionToChange] --authenticationDatabase admin --username root --password mdptrocool --file /data_host/data/[FileToChange].json  --jsonArray
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

## Errors

### "code: 'ER_NOT_SUPPORTED_AUTH_MODE', errno: 1251,"

Get into the MySQL container CLI, then run this command :

```bash
mysql -u root -p mysql -e " ALTER USER 'root'@'localhost' IDENTIFIED BY 'mdptrocool'; 
                            ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mdptrocool';
                            FLUSH PRIVILEGES;"
```
