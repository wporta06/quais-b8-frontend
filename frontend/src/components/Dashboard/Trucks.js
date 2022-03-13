import React, { useState, useEffect } from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [dashboardTrucks, setDashboardTrucks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getAllPrivatePosts().then(
      (response) => {
        console.log(response.data)
        setDashboardTrucks(response.data);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  }, []);

  return (
    
    <div>
      {dashboardTrucks.map((truck) => (
        <div >Matricul: {truck.matricul } 
          <p>Status: {truck.status}</p>
          <p>truckdriver: {truck.truckdriver}</p>
        </div>
      ))}
      {/* <h4>Truckdriver: {dashboardTrucks.map((truck) => truck.truckdriver)}</h4> */}
      {/* <h4>Matricul: {dashboardTrucks.map((truck) => truck.matricul)}</h4> */}
    </div>
  );
  
};

export default Home;
