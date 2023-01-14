import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '484266228ae93e20b0308dabb5cc53d8',
        language: 'en-US',
    },
});


export default movieDB;
