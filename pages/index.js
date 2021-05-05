import { useState } from 'react';
import createApi from './api';

const api = createApi();

const IndexPage = () =>  {
    /*  ========================== Counter ============================== */
    const [counterLoading, setCounterLoading] = useState(false);
    const handleIncreaseCounter = async () => {
        setCounterLoading(true);
        await api.increaseCounter();
        setCounterLoading(false);
    };

    const renderCounter = () => (
        <>
            <h1>Counter {counterLoading ? 'loading...' : ''}</h1>
            <button onClick={handleIncreaseCounter}>+1</button>
            <a href="/metrics/counter" target="_blank">Show metrics →</a>
        </>
    );

    /*  ========================== Gauge ============================== */

    const [gaugeLoading, setGaugeLoading] = useState(false);
    const handleChangeGauge = (value) => async () => {
        setGaugeLoading(true);
        await api.changeGauge(value);
        setGaugeLoading(false);
    };

    const renderGauge = () => (
        <>
            <h1>Gauge {gaugeLoading ? 'loading...' : ''}</h1>
            <h3>Choose temperature:</h3>
            <button onClick={handleChangeGauge(-10)}>-10</button>
            <button onClick={handleChangeGauge(-5)}>-5</button>
            <button onClick={handleChangeGauge(0)}>0</button>
            <button onClick={handleChangeGauge(5)}>5</button>
            <button onClick={handleChangeGauge(10)}>10</button>
            <a href="/metrics/gauge" target="_blank">Show metrics →</a>
        </>
    );

    /* ========================== Histogram ============================== */

    const [histogramLoading, setHistogramLoading] = useState(false);
    const handleCallHistogram = (timeout) => async () => {
        setHistogramLoading(true);
        await api.callHistogram(timeout);
        setHistogramLoading(false);
    };

    const renderHistogram = () => (
        <>
            <h1>Histogram {histogramLoading ? 'loading...' : ''}</h1>
            <h3>Choose delay in request (and send it):</h3>
            <button onClick={handleCallHistogram(300)}>300ms</button>
            <button onClick={handleCallHistogram(700)}>700ms</button>
            <button onClick={handleCallHistogram(1000)}>1000ms</button>
            <a href="/metrics/histogram" target="_blank">Show metrics →</a>
        </>
    );

    return (
        <div>
            <a href="/metrics" target="_blank">All metrics →</a>
            <br />
            {renderCounter()}
            {renderGauge()}
            {renderHistogram()}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req: { metrics } } = context; // metrics passed from express server handler

    return {
        props: {}, // will be passed to the page component as props
    };
}

export default IndexPage;
