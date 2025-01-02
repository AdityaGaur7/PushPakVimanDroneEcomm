import React, { useState } from "react";
import "./signup.css";
import RouteShow from "../../../components/routeshow/Routeshow.jsx";
import Layout from "../../../MainComponent/Layout.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../api.js";

const SignupComponent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    address: "",
    answer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const registerUser = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, userData);

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Register Error:", error);

      toast.error("something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, cpassword, address, phone, answer } = form;
    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }
    const userData = { name, email, password, phone, address, answer };
    registerUser(userData);
  };

  return (
    <Layout>
      <RouteShow item="Sign Up" />
      
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h2>Create Account</h2>
            <p>Please fill in your information to register</p>
          </div>
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <input
                name="name"
                type="text"
                className="form-input"
                id="name"
                placeholder="Username"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                name="email"
                type="email"
                className="form-input"
                id="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  name="password"
                  type="password"
                  className="form-input"
                  id="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  name="cpassword"
                  type="password"
                  className="form-input"
                  id="cpassword"
                  placeholder="Confirm Password"
                  value={form.cpassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <input
                name="phone"
                type="tel"
                className="form-input"
                id="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                name="address"
                type="text"
                className="form-input"
                id="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                name="answer"
                type="text"
                className="form-input"
                id="answer"
                placeholder="What is your favorite color? (Security Question)"
                value={form.answer}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="signup-button">
              Create Account
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? 
              <a href="/login" className="login-link"> Sign In</a>
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

export default SignupComponent;
