import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://final-mern-project-g5mi.onrender.com/api",
    withCredentials: true,
});

export default api;
