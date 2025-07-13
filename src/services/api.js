import axios from 'axios';

const Api = axios.create({
  baseURL: "https://backend-express-production-8b41.up.railway.app"
});

export default Api;