import axios from 'axios';

const createApi = (externalMetric) => {
    const transport = new axios.create({
        baseURL: '/'
    });

    return {
        increaseCounter() {
            transport.post('/api/counter');
        },
        changeGauge(value) {
            transport.post('/api/gauge', { value });
        },
        callHistogram(timeout) {
            transport.post('/api/histogram', { timeout });
        },
        async requestGithub() {
            const stop = externalMetric ? externalMetric.startTimer() : () => {};

            try {
                const response = await axios.get('https://api.github.com/search/repositories?q=stars:>1&sort=stars');

                stop({
                    code: response.status
                });

                // get random repo's index to return next five
                const randomIndex = Math.floor(Math.random() * (response.data.items.length - 5));

                return response.data.items.slice(randomIndex, randomIndex + 5).map(r => ({ url: r.url, stars: r.stargazers_count }));
            } catch (ex) {
                stop({
                    code: ex.response.status
                });
                console.log('Blocked until:', new Date(+ex.response.headers['x-ratelimit-reset'] * 1000));
            }
        }
    }
}

export default createApi;
