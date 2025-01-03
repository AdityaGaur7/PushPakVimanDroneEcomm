import React from "react";
import ThreeSection from "../../components/threesection/Threesection.jsx";
import HeroSection from "../../components/herosection/Herosection.jsx";
import Layout from "../Layout.jsx";
import "./home.css";
import Hero from "../../components/hero/Hero.jsx";
import { NavLink } from "react-router-dom";
const HomeComponent = () => {
  return (
    <Layout>
      <div className="home-container">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section */}
        <ThreeSection />

        <Hero/>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <div className="row align-items-center">
                <div className="col-lg-7">
                  <h2 className="cta-title">
                    Explore the Future of 
                    <span className="gradient-text"> Drones & Electronics</span>
                  </h2>
                  <p className="cta-description">
                    Join us in shaping the future of technology. Discover our latest
                    drone models and cutting-edge electronics.
                  </p>
                </div>
                <div className="col-lg-5 text-lg-end text-center mt-4 mt-lg-0">
                  <NavLink to="/products" className="btn btn-primary btn-lg">
                    Explore Products
                  </NavLink>
                  <div className="cta-stats">
                    <div className="stat-divider">
                      <span className="stat-number">98%</span>
                      <span className="stat-label">Customer Satisfaction</span>
                    </div>
                    <div className="stat-divider">
                      <span className="stat-number">500+</span>
                      <span className="stat-label">Products Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomeComponent;
