import React, { useContext } from 'react';
import Footer from "./footer/Footer.jsx";
import Navbar from "./navbar/Navbar.jsx";
import { ThemeContext } from '../Context/ThemeContext.jsx';
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const Layout = ({ children, title, description, keywords, author }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen"
    >
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '10px',
              padding: '16px',
            },
          }}
        />
        {children}
      </main>
      
      <Footer />
    </motion.div>
  );
};

Layout.defaultProps = {
  title: "Pushpak Drone Viman - Shop Now",
  description: "MERN Stack E-commerce Project",
  keywords: "mern,react,node,mongodb,ecommerce",
  author: "Ecommerce",
};

export default Layout;
