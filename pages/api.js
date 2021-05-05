import axios from 'axios';

const createApi = () => {
    const transport = new axios.create({
        baseURL: '/'
    });

    return {
        increaseCounter() {
            return transport.post('/api/counter');
        },
        changeGauge(value) {
            return transport.post('/api/gauge', { value });
        },
        callHistogram(timeout) {
            return transport.post('/api/histogram', { timeout });
        },
    }
}

export default createApi;
