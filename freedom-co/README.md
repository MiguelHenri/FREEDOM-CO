# FREEDOM&CO

## 🛹 Streetwear Store

This project uses [Vite](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md), [React](https://react.dev/) + [MantineUI](https://mantine.dev/getting-started/) and [Flask](https://flask.palletsprojects.com/en/3.0.x/quickstart/) to build an e-commerce. 

The focus here was to improve my frontend and backend development skills, by learning new technologies.

## 💻 Techs

- `Vite`: local server, using a plugin with [Babel](https://babeljs.io/) for fast refresh;
- `MantineUI`: a components library for React;
- `Flask`: backend using Python.

## 🎮 How to Run

Make sure you have PostgreSQL installed and tables created:
```bash
$ sudo apt install postgresql postgresql-contrib
$ sudo service postgresql start
```
```bash
$ sudo -i -u <username>
$ psql -U <username> -d <database_name> -a -f /<path>/sql/create_table.sql
```

To populate the table, run:
```bash
$ psql -U <username> -d <database_name> -a -f /<path>/sql/populate.sql
```

- Check this [link](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart) for help.

Create an environment for backend:
```bash
../backend$ python3 -m venv .venv
../backend$ source .venv/bin/activate
```

Install all dependencies running the following:
```bash
../backend$ pip install -r requirements.txt
```
```bash
../frontend$ npm install
```

Run frontend and backend using:
```bash
../frontend$ npm run dev
```
```bash
../backend$ flask run
```
