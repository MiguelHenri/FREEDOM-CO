# FREEDOM&CO

## 🛹 Streetwear Store

This project uses [Vite](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md), [React](https://react.dev/) + [MantineUI](https://mantine.dev/getting-started/), [Flask](https://flask.palletsprojects.com/en/3.0.x/quickstart/) and [PostgreSQL](https://www.postgresql.org/docs/) to build an e-commerce. 

The focus here was to improve my frontend and backend development skills, by learning new technologies.

## 💻 Techs

- `Vite`: local server, using a plugin with [Babel](https://babeljs.io/) for fast refresh;
- `MantineUI`: a components library for React;
- `Flask`: backend using Python;
- `PostgreSQL`: SQL database.

## 🎮 How to Run

Make sure you have PostgreSQL installed:
```bash
$ sudo apt install postgresql postgresql-contrib
$ sudo service postgresql start
```

Create and populate the table:
```bash
$ sudo -i -u <username>
$ psql -U <username> -d <database_name> -a -f /<path>/sql/create_table.sql
$ psql -U <username> -d <database_name> -a -f /<path>/sql/populate.sql
```
- Check this [link](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart) for help, if needed.

Create an environment for backend:
```bash
../backend$ python3 -m venv .venv
../backend$ source .venv/bin/activate
```
Install all dependencies running the following:
```bash
(.venv)../backend$ pip install -r requirements.txt
```
```bash
../frontend$ npm install
```

Run frontend and backend using:
```bash
(.venv)../backend$ flask run
```
```bash
../frontend$ npm run dev
```

- Make sure you have your .env files configured correctly. Check .env.example files.

After creating an account, you can make it an Admin running:
```
$ psql -U <username> -d <database_name> -a -f /<path>/sql/make_admin.sql
```
