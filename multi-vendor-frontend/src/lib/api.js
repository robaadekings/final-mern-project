import axios from 'axios';

const api = axios.create({
    baseURL: "https://final-mern-project-g5mi.onrender.com/api",
    withCredentials: true,
});

export default api;
