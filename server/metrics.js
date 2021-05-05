const promClient = require('prom-client');

/* Basic metrics */

const counter = new promClient.Counter({
    name: 'demo_counter',
    help: 'Demo counter description',
});

const gauge = new promClient.Gauge({
    name: 'demo_gauge',
    help: 'Demo gauge description'
});

const histogram = new promClient.Histogram({
    name: 'demo_histogram',
    help: 'Demo histogram description',
    buckets: [100, 500, 1000],
});

/* End of basic metrics */

/* Api requests metrics */

const apiRequestsDurationHistogram = new promClient.Histogram({
    name: 'api_request_duration_seconds',
    help: 'Demo histogram of requests timings.',
    labelNames: ['handler', 'code'],
});

/* End of api requests metrics */

module.exports = {
    counter,
    gauge,
    histogram,
    apiRequestsDurationHistogram
};
