import React from "react";
import Routeshow from "../../../components/routeshow/Routeshow.jsx";
import "./about.css";

const AboutComponent = ({ currentItem, teamMembers }) => {
  return (
    <div>
      <Routeshow item={currentItem} />

      {/* <Carousal /> */}

      <div className="container mt-5 h-50">
        <div className="row">
          <div className="col-md-4">
            <div className="image-container">
              <img src="./images/drone-flying.jpg" alt="Drone Image" />
              <div className="overlay">
                <h5 className="title">INNOVATIVE TECHNOLOGY</h5>
                <h3 className="subtitle">DRONES</h3>
                <p className="description">
                  Explore the latest in drone technology, perfect for aerial
                  photography, videography, and surveillance, providing
                  cutting-edge features with powerful performance.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="image-container">
              <img src="./images/microchips.jpg" alt="Electronics Image" />
              <div className="overlay">
                <h5 className="title">TOP-GRADE QUALITY</h5>
                <h3 className="subtitle">ELECTRONICS COMPONENTS</h3>
                <p className="description">
                  Our wide range of electronic components is ideal for building
                  circuits, repairing gadgets, or crafting your next big tech
                  project with industry-standard quality.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="image-container">
              <img
                src="./images/3dprinting.jpg"
                alt="3D Printing Models Image"
              />
              <div className="overlay">
                <h5 className="title">CREATIVE INNOVATION</h5>
                <h3 className="subtitle">3D PRINTING MODELS</h3>
                <p className="description">
                  Discover a variety of 3D printing models for your projects,
                  including customizable designs and high-precision materials
                  suitable for both beginners and professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5 team">
        <h2 className="text-center">Innovators Behind Our Success</h2>
        <p className="text-center">
          Our team of experts specializes in drones, electronics components, and
          3D printing models. Together, we create top-tier products and
          solutions for tech enthusiasts.
        </p>
        <div className="row">
          {teamMembers.map((member) => (
            <div className="col-md-4" key={member.name}>
              <div className="card text-center mb-4 position-relative">
                <img
                  src={member.image}
                  className="card-img-top"
                  alt={member.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text">{member.role}</p>
                </div>
                <div className="social-icons">
                  <a
                    href={member.social.facebook}
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href={member.social.twitter}
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href={member.social.pinterest}
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    href={member.social.instagram}
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5 contact">
        <h2 className="text-center">Get in Touch</h2>
        <p className="text-center">
          We'd love to hear from you! Whether you have a question about our
          products, services, or anything else, our team is ready to answer all
          your questions.
        </p>
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <h5>Contact Information</h5>
            <p>
              <i className="fas fa-map-marker-alt"></i> 123 Tech Street,
              Innovation City, Techland
            </p>
            <p>
              <i className="fas fa-phone"></i> +1 (123) 456-7890
            </p>
            <p>
              <i className="fas fa-envelope"></i> info@techcompany.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
