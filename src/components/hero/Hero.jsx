import React, { useContext } from "react";
import { motion } from "framer-motion";
import "./hero.css";
import { ThemeContext } from "../../Context/ThemeContext.jsx";

const Hero = () => {
  const { theme } = useContext(ThemeContext);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className={`hero-section ${theme}`}>
      <div className="hero-background">
        <div className="overlay"></div>
        
        {/* Main Hero Content */}
        <motion.div 
          className="hero-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h1 className="hero-title">
            Discover <span className="gradient-text">Future Tech</span>
          </h1>
          <p className="hero-subtitle">
            Explore our curated collection of cutting-edge technology solutions for tomorrow
          </p>
          <div className="hero-cta">
            <motion.a 
              href="/search/featured" 
              className="primary-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.a>
            <motion.a 
              href="/about" 
              className="primary-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Category Section */}
      <motion.div 
        className="categories-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="category-container">
          <div className="category-card">
            <div className="category-image">
              <img src="./images/drone-flying.jpg" alt="Drones" />
              <div className="category-overlay">
                <h3>Drones</h3>
                <p>Explore aerial technology</p>
                <a href="/search/drone" className="category-link">View Collection</a>
              </div>
            </div>
          </div>

          <div className="category-card">
            <div className="category-image">
              <img src="./images/electronicsgirl.jpg" alt="IOT Solutions" />
              <div className="category-overlay">
                <h3>IOT Solutions</h3>
                <p>Smart connectivity</p>
                <a href="/search/components" className="category-link">View Collection</a>
              </div>
            </div>
          </div>

          <div className="category-card">
            <div className="category-image">
              <img src="./images/3dprint.jpg" alt="3D Printing" />
              <div className="category-overlay">
                <h3>3D Printing</h3>
                <p>Future of manufacturing</p>
                <a href="/search/3D" className="category-link">View Collection</a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
