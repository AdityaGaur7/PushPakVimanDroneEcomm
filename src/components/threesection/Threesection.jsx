import React from "react";
import "./threesection.css";

const ThreeSection = () => {
  const features = [
    {
      title: "Professional Drones",
      description: "High-performance drones for aerial photography and surveying",
      image: "./images/drone1.jpg"
    },
    {
      title: "IoT Solutions",
      description: "Smart devices and components for your connected projects",
      image: "/images/electrocomp.jpg"
    },
    {
      title: "3D Printing",
      description: "Custom 3D printing services and modeling solutions",
      image: "/images/3dmodel.jpg"
    }
  ];

  return (
    <section className="services-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Discover our range of professional tech solutions</p>
        </div>
        
        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="service-card" style={{ backgroundImage: `url(${feature.image})` }}>
                <div className="service-content">
                  <h3 className="service-title">{feature.title}</h3>
                  <p className="service-description">{feature.description}</p>
                  <button className="btn btn-light service-btn">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeSection;
