import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaShoppingBag, FaTachometerAlt, FaAngleRight } from "react-icons/fa";

const UserMenu = () => {
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-primary border-0 py-4">
        <div className="d-flex align-items-center">
          <div className="rounded-circle bg-white p-3 me-3">
            <FaUser className="text-primary fs-4" />
          </div>
          <div>
            <h5 className="card-title text-white mb-0 fw-bold">User Panel</h5>
            <small className="text-white-50">Manage your account</small>
          </div>
        </div>
      </div>
      
      <div className="card-body p-3">
        <div className="list-group list-group-flush gap-1">
          <NavLink 
            to="/dashboard/user" 
            className={({isActive}) => 
              `list-group-item list-group-item-action border-0 rounded-3 d-flex align-items-center justify-content-between p-3 ${
                isActive ? 'active text-white bg-primary shadow-brand' : 'hover-primary'
              }`
            }
          >
            <div className="d-flex align-items-center">
              <FaTachometerAlt className="me-3" />
              <span className="fw-medium">Dashboard</span>
            </div>
            <FaAngleRight />
          </NavLink>
          
          <NavLink 
            to="/dashboard/user/profile" 
            className={({isActive}) => 
              `list-group-item list-group-item-action border-0 rounded-3 d-flex align-items-center justify-content-between p-3 ${
                isActive ? 'active text-white bg-primary shadow-brand' : 'hover-primary'
              }`
            }
          >
            <div className="d-flex align-items-center">
              <FaUser className="me-3" />
              <span className="fw-medium">Profile</span>
            </div>
            <FaAngleRight />
          </NavLink>
          
          <NavLink 
            to="/dashboard/user/orders" 
            className={({isActive}) => 
              `list-group-item list-group-item-action border-0 rounded-3 d-flex align-items-center justify-content-between p-3 ${
                isActive ? 'active text-white bg-primary shadow-brand' : 'hover-primary'
              }`
            }
          >
            <div className="d-flex align-items-center">
              <FaShoppingBag className="me-3" />
              <span className="fw-medium">Orders</span>
            </div>
            <FaAngleRight />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
