import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:10101",
  withCredentials: true,
});

export default instance;
