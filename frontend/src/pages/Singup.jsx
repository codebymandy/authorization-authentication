import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { handleError, handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Singup = () => {
  const [sing, setsing] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log(sing);
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    const singinfo = { ...sing };
    singinfo[name] = value;
    setsing(singinfo);
  };

  const handlesingup = async (e) => {
    e.preventDefault();
    const { name, email, password } = sing;

    if (!name || !email || !password) {
      return handleError("email and password are required");
    }

    try {
      const url = "http://localhost:8080/auth/singup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },

        body: JSON.stringify(sing),
      });

      const result = await response.json();
      console.log(result);
      const { massage, succes, error } = result;

      if (succes) {
        handleSuccess(massage);

        setTimeout(() => {
          navigate("/login");
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
      <h1 className="box">Singup</h1>
      <form onSubmit={handlesingup}>
        <div>
          {" "}
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              autoFocus
              value={sing.name}
              onChange={handlechange}
            />
          </label>
        </div>

        <div>
          {" "}
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              autoFocus
              value={sing.email}
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
              value={sing.password}
              onChange={handlechange}
            />
          </label>
        </div>
        <button type="submit">Singup</button>
        <span>
          Already have an account ?<Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Singup;
