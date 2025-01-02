import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container-fluid py-4">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-md-4">
            <img
              src="https://res.cloudinary.com/dqmf2mh8d/image/upload/v1735826340/gs8gxkiomuxgn6ndjjys.png"
              alt="Company Logo"
              className="footer-logo mb-3"
            />
            <p className="mb-2">support@drones-electronics.com</p>
            <div className="social-links">
              <a href="/" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="/" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h6 className="footer-heading">Quick Links</h6>
            <div className="row">
              <div className="col-6">
                <ul className="footer-links">
                  <li><a href="/drones">Products</a></li>
                  <li><a href="/blog">Blog</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/support">Support</a></li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="footer-links">
                  <li><a href="/faq">FAQ</a></li>
                  <li><a href="/warranty">Warranty</a></li>
                  <li><a href="/profile">My Account</a></li>
                  <li><a href="/shipping">Shipping</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-md-4">
            <h6 className="footer-heading">Newsletter</h6>
            <form className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-label="Email for newsletter"
                />
                <button className="btn btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="text-center mb-0">
            © {new Date().getFullYear()} DroneTech Innovators. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
