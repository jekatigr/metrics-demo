const express = require('express');
const metrics = require('./metrics');
const {
    counter,
    gauge,
    histogram,
} = metrics;

const apiRouter = express.Router();

const timeout = async (ms) => new Promise(r => setTimeout(r, ms));

apiRouter.post('/counter', async (req, res, next) => {
    await timeout(500);

    counter.inc();

    res.send('OK');
    next();
});

apiRouter.post('/gauge', async (req, res, next) => {
    await timeout(500);

    gauge.set(req.body.value);

    res.send('OK');
    next();
});

apiRouter.post('/histogram', async (req, res, next) => {
    const delay = Number(req.body.timeout);
    await timeout(delay);

    histogram.observe(delay);

    res.send(`OK - ${delay}`);
    next();
});

module.exports = apiRouter;
