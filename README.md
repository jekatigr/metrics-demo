# Metrics demo

Demo for meetup "How to add metrics in frontend project".

Examples include:

- Basic metrics
- Measuring internal API requests
- Measuring requests to external service

Technologies:

- React (NextJs),
- [prom-client](https://github.com/siimon/prom-client)
- Express
- Axios


# Setup and run

Setup:

```
yarn install
```

Run in dev mode: 

```
yarn dev
```

Run in production mode:

```
yarn build
yarn start
```

Application will be available at: [http://localhost:3000](http://localhost:3000).

# Prometheus and grafana

Look for grafana dashboard source in file `grafana-dashboard.json`.

Demo metrics will be published at: [http://localhost:3000/metrics](http://localhost:3000/metrics).
You'll need to add this route in prometheus targets for scraping.
