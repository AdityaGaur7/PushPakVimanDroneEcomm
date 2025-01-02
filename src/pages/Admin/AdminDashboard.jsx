import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../MainComponent/Layout.jsx";
import { useAuth } from "../../Context/auth.jsx";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaBox, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';
import "./Admin.css";

const AdminDashboard = () => {
  const { auth } = useAuth();
const navigate = useNavigate();
  const stats = [
    { title: "Total Users", value: "1,234", icon: <FaUsers />, color: "primary" },
    { title: "Total Products", value: "456", icon: <FaBox />, color: "success" },
    { title: "Total Orders", value: "789", icon: <FaShoppingCart />, color: "info" },
    { title: "Total Revenue", value: "$12,345", icon: <FaMoneyBillWave />, color: "warning" },
  ];

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 admin-sidebar">
              <AdminMenu />
            </div>
            
            <div className="col-md-9 admin-main">
              <div className="welcome-section mb-4">
                <h2>Welcome Back, {auth?.user?.name}</h2>
                <p className="text-muted">Here's what's happening with your store today.</p>
              </div>

              <div className="row stats-row">
                {stats.map((stat, index) => (
                  <div key={index} className="col-md-3 mb-4">
                    <div className={`stat-card bg-${stat.color} bg-opacity-10`}>
                      <div className="stat-icon">
                        {stat.icon}
                      </div>
                      <div className="stat-info">
                        <h3>{stat.value}</h3>
                        <p>{stat.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row mt-4">
                <div className="col-md-6 mb-4">
                  <div className="admin-card">
                    <h4>Profile Information</h4>
                    <div className="profile-info">
                      <p><strong>Name:</strong> {auth?.user?.name}</p>
                      <p><strong>Email:</strong> {auth?.user?.email}</p>
                      <p><strong>Contact:</strong> {auth?.user?.phone}</p>
                      <p><strong>Role:</strong> Administrator</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="admin-card">
                    <h4>Quick Actions</h4>
                    <div className="quick-actions">
                      <button className="btn btn-primary mb-2 w-100" onClick={()=>navigate('/dashboard/admin/create-product')}>Add New Product</button>
                      <button className="btn btn-success mb-2 w-100" onClick={()=>navigate('/dashboard/admin/orders')}>View Orders</button>
                      {/* <button className="btn btn-info mb-2 w-100"onClick={()=>navigate('/')}>Manage products</button> */}
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

export default AdminDashboard;
