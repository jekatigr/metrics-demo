const getMiddlewares = (histogram) => {
    /**
     * Middleware starts request timer and puts end callback function in locals.
     */
    const startMetric = (req, res, next) => {
        const stopTimer = histogram.startTimer();

        res.locals.metrics = { stopTimer };

        next();
    };

    /**
     * Middleware calls end callback for request metric.
     */
    const stopMetric = (req, res) => {
        const { stopTimer } = res.locals.metrics;

        stopTimer({
            code: res.statusCode,
            handler: req.originalUrl,
        });
    };

    return {
        startMetric,
        stopMetric
    }
}

module.exports = getMiddlewares;


