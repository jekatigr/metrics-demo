const express = require('express');
const promClient = require('prom-client');
const register = promClient.register;

const metricsRouter = express.Router();
metricsRouter.get('/', async (_req, res) => {
    res.set('Content-Type', register.contentType);
    res.send(await register.metrics());
})

metricsRouter.get('/counter', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.getSingleMetricAsString('demo_counter'));
});

metricsRouter.get('/gauge', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.getSingleMetricAsString('demo_gauge'));
});

metricsRouter.get('/histogram', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.getSingleMetricAsString('demo_histogram'));
});

module.exports = metricsRouter;
