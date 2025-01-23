import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth.jsx";
import { useCart } from "../../Context/cart.jsx";
import { BsSun, BsMoon, BsCart3, BsChevronDown } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import "./navbar.css";
import toast from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = ({ loggedin, isadmin, onThemeToggle, currentTheme }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { cart, setCart } = useCart();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 },
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar-modern">
      <div className="navbar-container">
        <NavLink className="navbar-logo" to="/">
          <img
            src="https://res.cloudinary.com/dqmf2mh8d/image/upload/v1735826340/gs8gxkiomuxgn6ndjjys.png"
            alt="Pushpakdroneviman Logo"
            className="logo-image"
          />
        </NavLink>

        {/* Hamburger Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        <div
          className={`nav-links-container ${
            isMobileMenuOpen ? "mobile-menu-open" : ""
          }`}
        >
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>

          {/* Catalog Dropdown */}
          <div
            className="dropdown-wrapper"
            onMouseEnter={() => setActiveDropdown("catalog")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="dropdown-trigger">
              Catalog <BsChevronDown className="dropdown-icon" />
            </button>
            <AnimatePresence>
              {activeDropdown === "catalog" && (
                <motion.div
                  className="mega-dropdown"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                >
                  <div className="mega-dropdown-content">
                    <div className="dropdown-section">
                      <h6 className="dropdown-header">DRONE</h6>
                      <NavLink to="/product/agriculture">
                        Agriculture Drone
                      </NavLink>
                      <NavLink to="/product/videography">
                        Videography Drone
                      </NavLink>
                      <NavLink to="/product/mapping">Mapping Drone</NavLink>
                      <NavLink to="/product/drone">Drone Kit</NavLink>
                    </div>
                    <div className="dropdown-section">
                      <h6 className="dropdown-header">3D-MODELS</h6>
                      <NavLink to="/product/customised">
                        Customised Objects
                      </NavLink>
                      <NavLink to="/product/lithographic">
                        Lithographic 3D Printing
                      </NavLink>
                      <NavLink to="/product/3D">3D Printed Objects</NavLink>
                      <NavLink to="/product/educational">
                        Educational Tools
                      </NavLink>
                    </div>
                    <div className="dropdown-section">
                      <h6 className="dropdown-header">IOT</h6>
                      <NavLink to="/product/microcontroller">
                        Microcontroller
                      </NavLink>
                      <NavLink to="/product/microcomputer">
                        Microcomputer
                      </NavLink>
                      <NavLink to="/product/soldering">Soldering Kits</NavLink>
                      <NavLink to="/product/iot">IOT Based Kit</NavLink>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* <NavLink className="nav-link" to="/services">Services</NavLink>
          <NavLink className="nav-link" to="/faq">FAQ</NavLink> */}
          <NavLink className="nav-link" to="/products">
            All Products
          </NavLink>

          {/* User Menu */}
          <div className="nav-right">
            {/* <NavLink to="/cart" className="cart-link">
               <BsCart3 />
              {cart?.length > 0 && <span className="cart-count">{cart.length}</span>}
            </NavLink> */}

            {!auth.user ? (
              <NavLink to="/login" className="login-btn">
                Login
              </NavLink>
            ) : (
              <div
                className="dropdown-wrapper"
                onMouseEnter={() => setActiveDropdown("user")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="user-menu-trigger">
                  {auth?.user?.name} <BsChevronDown className="dropdown-icon" />
                </button>
                <AnimatePresence>
                  {activeDropdown === "user" && (
                    <motion.div
                      className="user-dropdown"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                      <button onClick={handleLogout} className="logout-btn">
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* <button 
              onClick={onThemeToggle}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {currentTheme === 'light' ? <BsMoon /> : <BsSun />}
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
