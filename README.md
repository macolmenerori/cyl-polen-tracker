# cyl-polen-tracker

Useful web application to track the pollen levels in Castilla y León (Spain).

Check it out at [cylpolentracker.miguelangelcolmenero.es](cylpolentracker.miguelangelcolmenero.es)

## Requirements

- [Node JS](https://nodejs.org/en) `>24.0`
- [PNPM](https://pnpm.io/installation) `>10.0`
- [Mapbox Token](https://docs.mapbox.com/help/dive-deeper/access-tokens/)

## Set up and run (Docker)

Easiest way to set up the project to use it right away.

### Requirements

- [Docker](https://www.docker.com/) installed and running

### Steps

1. Edit the file `.example.env` with the Mapbox Token, then rename it to `.env`
2. Generate the Docker image

```
docker build -t cyl-polen-tracker:latest .
```

3. Run the Docker image

```
docker run --env-file .env -p 3000:3000 --name cyl-polen-tracker cyl-polen-tracker
```

## Set up and run (Native)

For feature-testing and development.

### Requirements

- Node JS
- PNPM

### Steps

1. Edit the file `.example.env` with all the parameters, then rename it to `.env`
2. Install packages `pnpm i`
3. Run the dev environment `pnpm start`
