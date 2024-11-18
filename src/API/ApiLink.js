import axios from "axios";
const instance = axios.create({
  baseURL: 'https://saad.27lashabab.com/api',
  // baseURL: 'https://back.varnda.com/api',
});
export default instance;
