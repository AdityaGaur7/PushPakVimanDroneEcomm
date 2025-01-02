import React from "react";
import "./product-section.css";
const ProductSection = () => {
  return (
    <div>
      <div className="mt-5 p-10">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-6">
            <div className="position-relative">
              <img
                src="./images/hero image.40b3fbbb9d784511fe71.avif"
                className="img-fluid"
                alt="Be you"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h3
              className="font-weight-bold"
              style={{
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                fontSize: "35px",
                color: "#ab12b3",
              }}
            >
              Style in handcrafts, made by professionals for you
            </h3>
            <img
              src="./images/hero image.40b3fbbb9d784511fe71.avif"
              className="img-fluid mt-3"
              alt="Handbag"
            />
            <p className="mt-3">
              Finest leather women's stylish and imported handbag from the best
              Baggo Leather Company.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "85vh",
          position: "absolute",
        }}
      >
        <div style={{ width: "50%" }}></div>
        <div style={{ backgroundColor: "#ab12b3", width: "50%" }}></div>
      </div>

      <div className="container mt-5 choosestyle">
        <h2 className="text-center mb-4">
          Choose y<span style={{ color: "white" }}>our style</span>
        </h2>
        <div className="row">
          <div className="col-md-4">
            <img
              src="./images/hero image.40b3fbbb9d784511fe71.avif"
              className="img-fluid img-hover"
              alt="Handbag 1"
            />
          </div>
          <div className="col-md-4">
            <img
              src="./images/hero image.40b3fbbb9d784511fe71.avif"
              className="img-fluid img-hover"
              alt="Handbag 2"
            />
          </div>
          <div className="col-md-4">
            <img
              src="./images/hero image.40b3fbbb9d784511fe71.avif"
              className="img-fluid img-hover"
              alt="Handbag 3"
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <p>
              Providing the best hand bags for your style and choice has always
              been our aim. We win our customers' hearts by listening to them.
            </p>
          </div>
        </div>
      </div>

      <div className="container text-center my-5 p-10">
        <div className="row d-flex justify-content-center">
          <div className="col-md-2">
            <img
              src="assets/images/icons/icon2.avif"
              className="rem5"
              alt="Quality Materials"
            />
            <h5>Quality Materials</h5>
          </div>
          <div className="col-md-2">
            <img
              src="assets/images/icons/icon3.avif"
              className="rem5"
              alt="Best Design"
            />
            <h5>Best Design</h5>
          </div>
          <div className="col-md-2">
            <img
              src="assets/images/icons/icon4.avif"
              className="rem5"
              alt="Finest Leather"
            />
            <h5>Finest Leather</h5>
          </div>
          <div className="col-md-2">
            <img
              src="assets/images/icons/icon1.avif"
              className="rem5"
              alt="Long Stitchline"
            />
            <h5>Long Stitchline</h5>
          </div>
          <div className="col-md-2">
            <img
              src="assets/images/icons/icon5.avif"
              className="rem5"
              alt="Premium Finish"
            />
            <h5>Premium Finish</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
