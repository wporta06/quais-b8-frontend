import axios from "axios";
import authHeader from "./auth-header";


const API_URL = "http://localhost:5000/api/";

const add = (truckMatricul, truckDrivers) => {
  const matricul=truckMatricul
  const truckdriver=truckDrivers
  return axios
    .post(API_URL + "trucks/", {
      matricul,
      truckdriver,
    },{ headers: authHeader() })
    .then((response) => {
      if (response.data) {
       console.log("Truck created succussfly")
      }
      return response.data;
    });
};
const remove = (id) => {
  
  return axios
    .delete(API_URL + "trucks/" + id, { headers: authHeader() })
    .then((response) => {
      if (response.data) {
       console.log("Truck Deleted succussfly")
      }
      return response.data;
    });
};



const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const TruckService = {
  add,
  remove,
  getCurrentUser,
};

export default TruckService;
