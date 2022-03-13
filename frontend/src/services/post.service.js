import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api";

const getAllPublicPosts = () => {
  return axios.get(API_URL + "/public");
};

const getAllPrivatePosts = () => {
  return axios.get(API_URL + "/trucks", { headers: authHeader() });
};

const postService = {
  getAllPublicPosts,
  getAllPrivatePosts,
};

export default postService;
