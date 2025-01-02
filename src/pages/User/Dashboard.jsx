import Layout from "../../MainComponent/Layout.jsx";
import UserMenu from "../../components/Layout/UserMenu.jsx";
import { useAuth } from "../../Context/auth.jsx";
import { FaUser, FaEnvelope, FaPhone, FaShoppingBag, FaShoppingCart } from "react-icons/fa";

const Dashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout title={"Dashboard"} description={"User Dashboard"}>
      <div className="container-fluid p-4">
        <div className="row g-4">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            {/* Welcome Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-body bg-primary bg-gradient text-white rounded-3 p-4">
                <h3 className="fw-bold mb-1">Welcome back, {auth?.user?.name}! 👋</h3>
                <p className="mb-0 opacity-75">Manage your account and view your orders</p>
              </div>
            </div>

            {/* Stats Cards Row */}
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle  bg-opacity-10 p-3 me-3">
                        <FaShoppingCart className="text-primary fs-4" />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Total Orders</h6>
                        <h4 className="mb-0">12</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                        <FaShoppingBag className="text-success fs-4" />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Completed</h6>
                        <h4 className="mb-0">8</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle  bg-opacity-10 p-3 me-3">
                        <FaShoppingBag className="text-warning fs-4" />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Pending</h6>
                        <h4 className="mb-0">4</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info Card */}
            <div className="card shadow-sm">
              <div className="card-header bg-white py-3">
                <h5 className="card-title mb-0">Profile Information</h5>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle  bg-opacity-10 p-3 me-3">
                        <FaUser className="text-primary" />
                      </div>
                      <div>
                        <small className="text-muted d-block">Full Name</small>
                        <span className="fw-medium">{auth?.user?.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle  bg-opacity-10 p-3 me-3">
                        <FaEnvelope className="text-primary" />
                      </div>
                      <div>
                        <small className="text-muted d-block">Email Address</small>
                        <span className="fw-medium">{auth?.user?.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle  bg-opacity-10 p-3 me-3">
                        <FaPhone className="text-primary" />
                      </div>
                      <div>
                        <small className="text-muted d-block">Phone Number</small>
                        <span className="fw-medium">{auth?.user?.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
