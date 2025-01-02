import { motion } from "framer-motion";
import "./routeshow.css";

const RouteShow = ({ item }) => {
  return (
    <section className="route-section">
      <div className="route-overlay"></div>
      <div className="container">
        <motion.div 
          className="route-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="route-title">{item}</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="breadcrumb-link">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item active">
                {item}
              </li>
            </ol>
          </nav>
        </motion.div>
      </div>
    </section>
  );
};

export default RouteShow;
