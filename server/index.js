const next = require('next');
const express = require('express');
const metricsRouter = require('./metricsRouter');
const apiRouter = require('./apiRouter');
const metrics = require('./metrics');
const { apiRequestsDurationHistogram, githubRequestsDurationHistogram } = metrics;
const getMiddlewares = require('./middleware');

const dev = process.env.NODE_ENV !== 'production';
const port = 3000;
const app = next({ dev });
const handle = app.getRequestHandler();
// Preparing middlewares
const { startMetric, stopMetric } = getMiddlewares(apiRequestsDurationHistogram);

app.prepare().then(() => {
    const server = express();
    server.use(express.json());

    // Injecting middlewares
    server.use('/api', startMetric, apiRouter, stopMetric);

    // Add metrics publisher
    server.use('/metrics', metricsRouter);

    // Proceed other pages
    server.all('*', (req, res) => {
        // put metric in request object to allow nextjs context access to it
        req.externalMetric = githubRequestsDurationHistogram;

        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) {
            throw err;
        }

        console.log(`> Ready on http://localhost:${port}`)
    })
})
