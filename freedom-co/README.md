# 🛹 FREEDOM&CO Streetwear Store

This project uses [Vite](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md), [React](https://react.dev/) + [MantineUI](https://mantine.dev/getting-started/), [Flask](https://flask.palletsprojects.com/en/3.0.x/quickstart/) and [PostgreSQL](https://www.postgresql.org/docs/) to build an e-commerce. 

The focus was to improve my frontend and backend development skills by learning new technologies.

## 💻 Stack

- `React`: frontend JavaScript library;
- `Flask`: backend using Python;
- `PostgreSQL`: SQL database.

## 🎮 How to Run

⚠ Make sure your .env files are configured correctly. Check .env.example files.

### Postgres

Install and start PostgreSQL:
```bash
$ sudo apt install postgresql postgresql-contrib
$ sudo service postgresql start
```

Create and populate the database:
```bash
$ sudo -i -u <username>
$ psql -U <username> -d <database_name> -a -f /<path>/sql/create_table.sql
$ psql -U <username> -d <database_name> -a -f /<path>/sql/populate.sql
```
- Check this [link](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart) for help, if needed.

After creating an account, you can make it an Admin running:
```
$ psql -U <username> -d <database_name> -a -f /<path>/sql/make_admin.sql
```

### Backend

On the `backend` directory, create the environment:
```bash
$ python3 -m venv .venv
$ source .venv/bin/activate
```
Install all dependencies running the following:
```bash
$ pip install -r requirements.txt
```
Finally, run the backend server:
```bash
$ flask run
```

### Frontend

On the `frontend` directory, install all the dependencies:
```bash
$ npm install
```
Run frontend using:
```bash
$ npm run dev
```
