import Layout from "../../MainComponent/Layout.jsx";
import UserMenu from "../../components/Layout/UserMenu.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api.js";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaMapMarkerAlt, FaQuestionCircle, FaEdit } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  useEffect(() => {
    if (auth?.user) {
      setFormData({
        name: auth.user.name || "",
        email: auth.user.email || "",
        phone: auth.user.phone || "",
        address: auth.user.address || "",
        answer: auth.user.answer || "",
        password: "",
      });
    }
  }, [auth?.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Show loading toast
      const loadingToast = toast.loading('Updating profile...');
      
      const { data } = await axios.put(
        `${API_URL}/api/auth/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      // console.log(data);
      

      if (data?.success) {
        // Update auth context
        setAuth({ ...auth, user: data.updatedUser });
        
        // Update localStorage
        const ls = JSON.parse(localStorage.getItem("auth") || '{}');
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success("Profile updated successfully");
        setShowEditModal(false);
      } else {
        // Handle unsuccessful response
        toast.dismiss(loadingToast);
        toast.error(data?.message || "Failed to update profile");
      }
    } catch (error) {
      // Handle specific error cases
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Something went wrong while updating profile";
      toast.error(errorMessage);
      console.error("Profile update error:", error);
    }
  };

  return (
    <Layout title={"Profile"} description={"Manage your profile"}>
      <div className="container-fluid py-4">
        <div className="row g-4">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card border-0 rounded-4 shadow-sm">
              <div className="card-header border-0 bg-gradient-primary text-white p-4 rounded-top-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0 d-flex align-items-center">
                    <FaUser className="me-3" />
                    Profile Details
                  </h4>
                
                </div>
              </div>
              <div className="card-body p-4">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="d-flex justify-content-between align-items-start">
                        <label className="text-muted mb-2">Full Name</label>
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setEditingField('name');
                            setShowEditModal(true);
                          }}
                        >
                          <FaEdit className="me-1" />
                          Edit
                        </button>
                      </div>
                      <p className="h5">{auth?.user?.name}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="d-flex justify-content-between align-items-start">
                        <label className="text-muted mb-2">Email Address</label>
                        {/* <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setEditingField('email');
                            setShowEditModal(true);
                          }}
                        >
                          <FaEdit className="me-1" />
                          Edit
                        </button> */}
                      </div>
                      <p className="h5">{auth?.user?.email}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="d-flex justify-content-between align-items-start">
                        <label className="text-muted mb-2">Phone Number</label>
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setEditingField('phone');
                            setShowEditModal(true);
                          }}
                        >
                          <FaEdit className="me-1" />
                          Edit
                        </button>
                      </div>
                      <p className="h5">{auth?.user?.phone}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="d-flex justify-content-between align-items-start">
                        <label className="text-muted mb-2">Address</label>
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setEditingField('address');
                            setShowEditModal(true);
                          }}
                        >
                          <FaEdit className="me-1" />
                          Edit
                        </button>
                      </div>
                      <p className="h5">{auth?.user?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4 border-0">
              <div className="modal-header border-0 bg-gradient-primary text-white rounded-top-4">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSubmit} className="profile-form">
                  {editingField === 'name' && (
                    <div className="form-group">
                      <label className="input-label mb-2 text-muted d-flex align-items-center">
                        <FaUser className="me-2 text-primary" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg border-0 bg-light rounded-3 shadow-none"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  {editingField === 'email' && (
                    <div className="form-group">
                      <label className="input-label mb-2 text-muted d-flex align-items-center">
                        <FaEnvelope className="me-2 text-primary" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg border-0 bg-light rounded-3 shadow-none"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}
                  
                  {editingField === 'phone' && (
                    <div className="form-group">
                      <label className="input-label mb-2 text-muted d-flex align-items-center">
                        <FaPhone className="me-2 text-primary" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control form-control-lg border-0 bg-light rounded-3 shadow-none"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )}

                  {editingField === 'address' && (
                    <div className="form-group">
                      <label className="input-label mb-2 text-muted d-flex align-items-center">
                        <FaMapMarkerAlt className="me-2 text-primary" />
                        Address
                      </label>
                      <textarea
                        className="form-control form-control-lg border-0 bg-light rounded-3 shadow-none"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows="3"
                      />
                    </div>
                  )}

                  <div className="text-end mt-4">
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-lg me-2 rounded-3"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg rounded-3 text-white"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
