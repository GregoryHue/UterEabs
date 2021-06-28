# ProjectUberEat

## Database

To import the sql database, open CMD as admin :

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

To start the api, first, install the dependencies with :

```Node
npm install
```

then run it with :

```Node
nodemon start
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

