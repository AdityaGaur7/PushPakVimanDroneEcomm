import { motion } from "framer-motion";
import "./herosection.css";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {

  const navigate = useNavigate();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const droneAnimation = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="hero-section">
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="hero-title"
            {...fadeIn}
          >
            Pushpak Drone 
            <span className="gradient-text"> Viman Store</span>
          </motion.h1>
          
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover cutting-edge drones, IoT solutions, and 3D printing services
            for your innovative projects.
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button 
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>navigate('/products')}
            >
              Explore Products
            </motion.button>
            {/* <motion.button 
              className="btn btn-outline"
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="play-icon">▶</span> Watch Demo
            </motion.button> */}
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="stat-item">
              <h3>500+</h3>
              <p>Products</p>
            </div>
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Customers</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img 
            src="/images/bglessdrone.png" 
            alt="Featured Drone"
            animate="animate"
            variants={droneAnimation}
          />
          <div className="hero-image-bg"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
