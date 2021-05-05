const promClient = require('prom-client');

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

module.exports = {
    counter,
    gauge,
    histogram,
};
