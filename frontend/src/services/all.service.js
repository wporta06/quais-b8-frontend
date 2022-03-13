import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api";

const getAllPublicPosts = () => {
  return axios.get(API_URL + "/public");
};

const getAllTrucks = () => {
  return axios.get(API_URL + "/trucks", { headers: authHeader() });
};

const getAllDrivers = () => {
  return axios.get(API_URL + "/drivers/alldrivers", { headers: authHeader() });
};

const allService = {
  getAllPublicPosts,
  getAllTrucks,
  getAllDrivers
};

export default allService;
