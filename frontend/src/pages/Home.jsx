import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [user, setuser] = useState();
  const [Productuser, setProductuser] = useState([]);
  const navigate = useNavigate();
  console.log(Productuser)
  useEffect(() => {
    setuser(localStorage.getItem("loggeduser"));
  }, []);

  const handlechange = () => {
    localStorage.removeItem("loggeduser");
    localStorage.removeItem("token");
    handleSuccess("User Logout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/Products";

      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();

      console.log("This is product" , result);
      setProductuser(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="user">
      <h1>{user}</h1>
      {Productuser && Productuser.map((item , index) => (
          <ul key={index}>
       <span>{item.name}:{item.price}</span>
          </ul>
      ))}
      <button onClick={handlechange}>Logout</button>
      <ToastContainer />
    </div>
  );
};

export default Home;
