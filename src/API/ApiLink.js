import axios from "axios";
const instance = axios.create({
  baseURL: 'https://back.varnda.com/api',
});
export default instance;
