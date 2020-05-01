import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const { DEV_BASEURL } = require("../config/env");
axios.defaults.baseURL = DEV_BASEURL;
axios.defaults.timeout = 8000;

axios.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default axios;
