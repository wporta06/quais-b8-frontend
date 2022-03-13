import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(name, organisation, email, password).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
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
      <section class="vh-100 mt-5 authsection">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
            </div>

            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h1>Sign up</h1>
              <form onSubmit={handleSignup}>
                <input type="hidden" id="user" name="role" value="user" />
                {/* <!-- Name input --> */}
                <div class="form-outline mb-4">
                  <input type="text" id="name" name="name" class="form-control form-control-lg"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                </div>
                {/* <!-- Email input --> */}
                <div class="form-outline mb-4">

                  <input type="email" id="email" name="email" class="form-control form-control-lg"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                {/* <!-- organisation input --> */}
                <div class="form-outline mb-4">

                  <input type="organisation" id="email" name="email" class="form-control form-control-lg"
                    placeholder="organisation"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)} />
                </div>

                {/* <!-- Password input --> */}
                <div class="form-outline mb-3">
                  <input type="password" id="password" name="password" class="form-control form-control-lg"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" class="btn btn-primary btn-lg">Sign up</button>
                  <p class="small fw-bold mt-2 pt-1 mb-0">Have an account? <a href="/login" class="link-danger">Login</a></p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Signup;
