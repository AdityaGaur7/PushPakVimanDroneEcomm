import { useState } from "react";
import "./services.css";
import { teamMembers } from "../../../data.js";
import Routeshow from "../../../components/routeshow/Routeshow.jsx";
import Layout from "../../../MainComponent/Layout.jsx";
const ServicesComponent = () => {
  const currentItem = "Services";

  return (
    <Layout>
      <Routeshow item={currentItem}></Routeshow>
      <div>
        <div className="container text-center my-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="display-4">INNOVATE, CREATE, ELEVATE</h1>
              <p className="lead">
                Explore the world of cutting-edge drones, advanced electronics,
                and 3D printing models. Whether you're a hobbyist or a
                professional, we have the latest tech to bring your ideas to
                life. From high-performance drones to customizable 3D printed
                products, transform your creative visions into reality.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="./images/quadrocopter.png"
                className="img-fluid"
                alt="Innovative Tech Image"
              />
            </div>
          </div>
        </div>

        <div className="container text-center my-5 border">
          <h1 className="mb-4">REVOLUTIONARY TECH SOLUTIONS</h1>
          <h5 className="mb-5">FOR YOUR CREATIVE JOURNEY</h5>

          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">NEXT-GEN DRONES</h5>
                  <p className="card-text">
                    Take to the skies with precision control, high-quality
                    cameras, and long-lasting battery life. Whether for
                    photography or exploration, our drones offer the best aerial
                    experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">SMART ELECTRONICS</h5>
                  <p className="card-text">
                    Upgrade your tech setup with smart gadgets that enhance
                    productivity, entertainment, and connectivity. Explore a
                    range of products that combine innovation with practicality.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">3D PRINTING EXCELLENCE</h5>
                  <p className="card-text">
                    Bring your designs to life with our top-tier 3D printers.
                    From prototypes to fully functional models, our products
                    offer unparalleled quality and precision in 3D printing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h5 className="mt-5">24-MONTH WARRANTY ON TECH PRODUCTS</h5>
          <p>
            Quality and reliability guaranteed. Discover advanced electronics
            and drones backed by extended warranties.
          </p>
        </div>

        <div className="container text-center my-5">
          <h1 className="display-4">CUSTOMIZED TECH SOLUTIONS</h1>
          <p className="lead">Tailored for Your Needs</p>

          <div className="row align-items-center border m-2">
            <div className="col-md-6">
              <img
                src="./images/prod1.jpg"
                className="img-fluid rounded"
                alt="Customized Drone"
              />
            </div>
            <div className="col-md-6">
              <h2>HIGH-PRECISION DRONES</h2>
              <p>
                Our customizable drones offer cutting-edge technology and
                superior flight performance, ensuring accurate control and
                enhanced aerial photography capabilities.
              </p>
            </div>
          </div>

          <div className="row align-items-center border m-2">
            <div className="col-md-6">
              <h2>INNOVATIVE ELECTRONIC SOLUTIONS</h2>
              <p>
                Get your hands on electronics designed to make life easier,
                smarter, and more connected. Whether its for your home, office,
                or creative projects, we have the perfect solution.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="./images/capacitors.jpg"
                className="img-fluid rounded"
                alt="Customized Electronics"
              />
            </div>
          </div>
        </div>

        <div className="container my-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                src="./images/boats.jpg"
                alt="Custom 3D Printing"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h2>Custom 3D Printing Models</h2>
              <p>
                Discover our range of 3D printing services tailored to your
                needs. Whether youre building prototypes or final products, our
                3D printers provide industry-leading accuracy and precision.
              </p>

              <i className="fa fa-play"></i>
              <a href="#" className="videobtn">
                VIEW OUR VIDEO
              </a>
            </div>
          </div>
        </div>

        <div className="container my-5 team">
          <h2 className="text-center">Innovators Behind Our Success</h2>
          <p className="text-center">
            Our team of experts specializes in drones, electronics components,
            and 3D printing models. Together, we create top-tier products and
            solutions for tech enthusiasts.
          </p>
          <div className="row">
            {teamMembers.map((member, index) => (
              <div className="col-md-4" key={index}>
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
      </div>
    </Layout>
  );
};

export default ServicesComponent;
