# ProjectUberEat

## API

The API works with Docker, get into the api folder and run :

```bash
docker-compose build | docker-compose up -d --remove-orphans
```
This will also run the Mongo database and MySQL database. You have to run this command for every change on the API.

Both databases on both containers will be empty (which might makes the API crash), you need to import the data with the .json and .sql files provided.

## Import data into MySQL container and fix issues

### "code: 'ER_NOT_SUPPORTED_AUTH_MODE', errno: 1251,"

Get into the MySQL container CLI, then run this command :

```bash
mysql -u root -p mysql -e " ALTER USER 'root'@'localhost' IDENTIFIED BY 'mdptrocool'; 
                            ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mdptrocool';
                            FLUSH PRIVILEGES;"
```

## Import data into MongoDB container and fix issues

## Front

To start the front, first, install the dependencies with :

```Node
npm install
```

then run it with :

```Node
npm run serve
```

