# ProjectUberEat

## MySQL

To import the sql database, use the .sql file provided. Open CMD as admin and get into your MySQL folder (typically "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\MySQL"), then import the database using this command:

`
mysql -u root -p uber_eats < D:\Dev\Project\database.sql
`

To fix the "Client does not support authentication protocol requested by server; consider upgrading MySQL client", this sql :

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mdptrocool';
```

then run this sql:

```sql
flush privileges;
```

## API

The API works with Docker, get into the api folder and run :

```Docker
docker compose build | docker compose up
```
This will also run the Mongo database and MySQL database. You have to run this command for every change on the API.

## Front

To start the front, first, install the dependencies with :

```Node
npm install
```

then run it with :

```Node
npm run serve
```

