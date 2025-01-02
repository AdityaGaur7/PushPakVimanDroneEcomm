import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Layout from "../../../MainComponent/Layout.jsx";
import RouteShow from "../../../components/routeshow/Routeshow.jsx";
import axios from "axios";
import { API_URL } from "../../../api.js";
import toast from "react-hot-toast";
import { useAuth } from "../../../Context/auth.jsx";

const LoginComponent = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);
      if (res && res.data.success) {
        toast.success(res.data.message);

        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        // console.log(res.data);
        
        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Login Error:", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <RouteShow item="Login" />
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? 
              <a href="/signup" className="signup-link"> Create one</a>
            </p>
            <a href="/" className="return-link">
              Return to Store
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginComponent;
