const next = require('next');
const express = require('express');
const metricsRouter = require('./metricsRouter');
const metrics = require('./metrics');
const {
    counter,
    gauge,
    histogram,
} = metrics;

const dev = process.env.NODE_ENV !== 'production';
const port = 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const timeout = async (ms) => new Promise(r => setTimeout(r, ms));

app.prepare().then(() => {
    const server = express();
    server.use(express.json());

    server.post('/api/counter', async (req, res) => {
        await timeout(500);

        counter.inc();

        res.send('OK');
    });

    server.post('/api/gauge', async (req, res) => {
        await timeout(500);

        gauge.set(req.body.value);

        res.send('OK');
    });

    server.post('/api/histogram', async (req, res) => {
        const delay = Number(req.body.timeout);
        await timeout(delay);

        histogram.observe(delay);

        res.send(`OK - ${delay}`);
    });

    server.use('/metrics', metricsRouter);

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) {
            throw err;
        }

        console.log(`> Ready on http://localhost:${port}`)
    })
})
