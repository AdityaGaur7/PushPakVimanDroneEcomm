import React from "react";
import "./linesection.css";

const LineSection = () => {
  return (
    <div className="container cont py-4">
      <div className="row text-center text-white d-flex">
        {/* Feature 1 */}
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="d-flex flex-column flex-md-row align-items-center text-md-left">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/imageupload-ded28.appspot.com/o/BagEcomm%2Fimages%2Fi1.webp?alt=media&token=fdd890b1-ae22-4513-b894-ea791a935723"
              alt=""
              className="mb-2 mb-md-0"
            />
            <div className="line-txt">
              <h6 className="font-weight-bold">WORLD WIDE</h6>
              <p>ANYTIME FREE SHIPPING</p>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="d-flex flex-column flex-md-row align-items-center text-right">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/imageupload-ded28.appspot.com/o/BagEcomm%2Fimages%2Fi2.webp?alt=media&token=5f99c21e-3d50-4de8-b076-ff280d2cc4dd"
              alt=""
              className="mb-2 mb-md-0"
            />
            <div className="line-txt">
              <h6 className="font-weight-bold">FREE RETURNS</h6>
              <p>ASSURED REIMBURSEMENT</p>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="col-12 col-md-6 col-lg-3 mb-3 mb-md-0">
          <div className="d-flex flex-column flex-md-row align-items-center text-md-left">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/imageupload-ded28.appspot.com/o/BagEcomm%2Fimages%2Fi3.webp?alt=media&token=cd95a556-396a-493d-ae2a-89f581ea03fb"
              alt=""
              className="mb-2 mb-md-0"
            />
            <div className="line-txt">
              <h6 className="font-weight-bold">24 MONTHS WARRANTY</h6>
              <p>FOR LEATHER</p>
            </div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="col-12 col-md-6 col-lg-3 mb-3">
          <div className="d-flex flex-column flex-md-row align-items-center text-md-left">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/imageupload-ded28.appspot.com/o/BagEcomm%2Fimages%2Fi4.webp?alt=media&token=e90c8613-68d3-45c6-af05-f51a7c1b2300"
              alt=""
              className="mb-2 mb-md-0"
            />
            <div className="line-txt">
              <h6 className="font-weight-bold">100% SAFE & SECURE</h6>
              <p>CHECKOUT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineSection;
