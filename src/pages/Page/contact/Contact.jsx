import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./contact.css";

const ContactComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
  };

  return (
    <div>
      <div className="container map" data-aos="fade-up">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218.96026097138238!2d77.31690343469374!3d28.588849752848265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce50faee64f71%3A0x4f5d4af8692d882e!2sMYTSSS!5e0!3m2!1sen!2sin!4v1713985158474!5m2!1sen!2sin"
          frameBorder="0"
          style={{ border: 0, width: "100%", height: "290px" }}
          allowFullScreen
        ></iframe>
      </div>

      <div className="container my-5">
        <div className="row text-center mb-4">
          <div className="col-md-4">
            <div className="contact-box p-4">
              <div className="icon mb-3">
                <i className="fas fa-phone fa-2x text-white"></i>
              </div>
              <h4 className="mb-2">PHONE</h4>
              <p>Toll-Free: 012 - 345 - 6789</p>
              <p>Fax: 012 - 345 - 6789</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-box p-4">
              <div className="icon mb-3">
                <i className="fas fa-envelope fa-2x text-white"></i>
              </div>
              <h4 className="mb-2">EMAIL</h4>
              <p>mailxample.com</p>
              <p>supportxample.com</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-box p-4">
              <div className="icon mb-3">
                <i className="fas fa-map-marker-alt fa-2x text-white"></i>
              </div>
              <h4 className="mb-2">ADDRESS</h4>
              <p>No: 58 A, East Madison Street,</p>
              <p>Baltimore, MD, USA 4508</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h4 className="text-center mb-4">CONTACT FORM</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <div className="text-danger">Name is required.</div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <div className="text-danger">
                      A valid email is required.
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && (
                    <div className="text-danger">Phone is required.</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Message"
                {...register("message", { required: true, minLength: 10 })}
              ></textarea>
              {errors.message && (
                <div className="text-danger">
                  Message must be at least 10 characters long.
                </div>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-dark px-5"
                disabled={Object.keys(errors).length > 0}
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
