import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(email)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        () => {
          navigate("/home");
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

  return (
    <div>
      <section className="mt-5 vh-100 authsection">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <h1>Login</h1>
              <form onSubmit={handleLogin}>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">

                  <input type="email" id="email" className="form-control form-control-lg"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                  <input type="password" id="password" name="password" className="form-control form-control-lg"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {/* <!-- Checkbox --> */}
                  <div className="form-check mb-0">
                    {/* <!-- <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" /> */}
                    {/* <label className="form-check-label" for="form2Example3"/> */}
                    {/* Remember me */}
                    {/* </label> --> */}
                  </div>
                  {/* <a href="#!" className="text-body">Forgot password?</a> */}
                </div>
                <button className="btn btn-primary btn-lg" type="submit">Log in</button>
              </form>

              <div className="text-center text-lg-start mt-4 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup" className="link-danger">Register</a></p>
              </div>

            </div>
          </div>
        </div>

      </section>
    </div>




  );
};

export default Login;
