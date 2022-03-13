import React, { useState, useEffect } from "react";
import AllService from "../../../services/all.service";
import AuthService from "../../../services/auth.service";
import TruckService from "../../../services/trucks.service";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [dashboardTrucks, setDashboardTrucks] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);

  const [truckMatricul, settruckMatricul] = useState("");
  const [truckDrivers, settruckDrivers] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // get all trucks
    AllService.getAllTrucks().then(
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
    // get all drivers
    AllService.getAllDrivers().then(
      (response) => {
        // console.log(response.data)
        setAllDrivers(response.data);
        console.log(response.data)
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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await TruckService.add(truckMatricul, truckDrivers).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          navigate("/dashboard");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    let id = e.target.parentElement.value
    try {
      await TruckService.remove(id).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          navigate("/dashboard");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
    console.log(e.target.parentElement.value)
  };

  return (

    <div>
      {dashboardTrucks.map((truck) => (
        <div >Matricul: {truck.matricul}
          <p>Status: {truck.status}</p>
          <p>truckdriver: {truck.truckdriver}</p>
        </div>
      ))}
      {/* <h4>Truckdriver: {dashboardTrucks.map((truck) => truck.truckdriver)}</h4> */}
      {/* <h4>Matricul: {dashboardTrucks.map((truck) => truck.matricul)}</h4> */}
      <div class="container">
        {/* Create DRIVER */}
        <div class="col-lg-8 card m-5 p-5">
          <form id="contact-form" onSubmit={handleCreate}>
            <h3>Add Truck</h3>
            <div class="form-group input-material">
              <input type="text" class="form-control" id="name-field" required
                placeholder="Truck Matricul"
                value={truckMatricul}
                onChange={(e) => settruckMatricul(e.target.value)} />
            </div>

            <div class="form-group input-material">
              <div class="form-group input-material">
                <label >Truck Drivers</label>
                <select class="form-control" id="personality"  placeholder="Truck Drivers" onChange={(e) => settruckDrivers(e.target.value)} required>
                      <option disabled>----</option>
                  {allDrivers.map((driver) => (
                    
                      <option value={driver.driverLicensindex}>{driver.driverLicensindex} ({driver.name})</option>
                   
                  ))}
                </select>
              </div>
            </div>



            <div class="text-center mt-4">
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
        {/* SHOW ALL DRIVERS */}

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Truck Matricul</th>
              <th scope="col">Truck driver Licens</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {dashboardTrucks.map((truck) => (
              <tr>
                <th scope="row">{truck._id}</th>
                <td>{truck.matricul}</td>
                <td>{truck.truckdriver}</td>
                <td>{truck.status}</td>
                <td  ><button value={truck._id} onClick={handleDelete} ><i class="fas fa-trash"></i></button><button><i class="fas fa-pen"></i></button></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );

};

export default Home;
