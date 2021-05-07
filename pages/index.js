import React from 'react';
import createApi from './api';

const api = createApi();

const IndexPage = ({ repos: reposProps }) =>  {
    /*  ========================== Counter ============================== */
    const handleIncreaseCounter = () => {
        api.increaseCounter();
    };

    const renderCounter = () => (
        <>
            <h1>Counter</h1>
            <button onClick={handleIncreaseCounter}>+1</button>
            <a href="/metrics/counter" target="_blank">Show metrics →</a>
        </>
    );

    /*  ========================== Gauge ============================== */

    const handleChangeGauge = (value) => () => {
        api.changeGauge(value);
    };

    const renderGauge = () => (
        <>
            <h1>Gauge</h1>
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

    const handleCallHistogram = (timeout) => () => {
        api.callHistogram(timeout);
    };

    const renderHistogram = () => (
        <>
            <h1>Histogram</h1>
            <h3>Choose delay in request (and send it):</h3>
            <button onClick={handleCallHistogram(300)}>300ms</button>
            <button onClick={handleCallHistogram(700)}>700ms</button>
            <button onClick={handleCallHistogram(1000)}>1000ms</button>
            <a href="/metrics/histogram" target="_blank">Show metrics →</a>
        </>
    );

    /* ========================== SSR data example ============================== */

    const [repos, setRepos] = React.useState(reposProps);

    const updateRepos = async () => {
        const res = await api.requestGithub();
        setRepos(res);
    };

    const renderSSRReposInfo = () => (
        <div>
            <h1>Popular github repos</h1>
            <ul>
                {repos ? repos.map(r => (
                    <li key={r.url}>{r.stars} stars, url: {r.url}</li>
                )) : 'Github blocked me!'}
            </ul>
            <button onClick={updateRepos}>Update</button>
            <a href="/metrics/github" target="_blank">Show metrics →</a>
        </div>
    );

    return (
        <div>
            <a href="/metrics" target="_blank">All metrics →</a><br />
            {renderCounter()}
            {renderGauge()}
            {renderHistogram()}
            <br /><br /><br />
            <a href="/metrics/internal" target="_blank">Show internal api metrics →</a>
            {renderSSRReposInfo()}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { req: { externalMetric } } = context; // metrics passed from express server handler

    const api = createApi(externalMetric);

    const repos = await api.requestGithub();

    return {
        props: { // will be passed to the page component as props
            repos: repos || null
        },
    };
}

export default IndexPage;
