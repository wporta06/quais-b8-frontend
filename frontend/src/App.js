import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard/Trucks";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentUserRole, setCurrentUserRole] = useState("user");

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setCurrentUserRole(user.role)
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {currentUserRole == "admin" && (
            <li className="nav-item">
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
            </li>
          )}
        </div>
        
        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
