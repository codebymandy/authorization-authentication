import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { handleError, handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [Login, setLoing] = useState({
    
    email: "",
    password: "",
  });

  console.log(Login);
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    const Logininfo = { ...Login };
    Logininfo[name] = value;
    setLoing(Logininfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = Login;

    if ( !email || !password) {
      return handleError("email and password are required");
    }

    try {
      const url = "http://localhost:8080/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },

        body: JSON.stringify(Login),
      });

      const result = await response.json();
      console.log(result);
      const { massage, succes, error , jwtToken , name } = result;

      if (succes) {
        handleSuccess(massage);
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('loggeduser', name)

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].massage;
        handleError(details);
      } else if (!succes) {
        handleError(massage);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="cantainer">
      <h1 className="box">Login</h1>
      <form onSubmit={handleLogin}>
       

        <div>
          {" "}
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              autoFocus
              value={Login.email}
              onChange={handlechange}
            />
          </label>
        </div>

        <div>
          {" "}
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              autoFocus
              value={Login.password}
              onChange={handlechange}
            />
          </label>
        </div>
        <button type="submit">Login</button>
        <span>
           Does't an account ?<Link to="/singup">Singup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
