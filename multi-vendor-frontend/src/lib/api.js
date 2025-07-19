import axios from 'axios';

const api = axios.create({
    baseURL: "https://final-mern-project-g5mi.onrender.com",
    withCredentials: true,
});

export default api;
