import React, { useEffect, useState } from "react";
import Layout from "../../MainComponent/Layout.jsx";
import UserMenu from "../../components/Layout/UserMenu.jsx";
import axios from "axios";
import { useAuth } from "../../Context/auth.jsx";
import { API_URL } from "../../api.js";
import moment from "moment";
import { FaShoppingBag, FaClock, FaRupeeSign, FaSort } from "react-icons/fa";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'processing': return 'warning';
    case 'shipped': return 'info';
    case 'delivered': return 'success';
    case 'cancelled': return 'danger';
    default: return 'secondary';
  }
};

const OrderCard = ({ order }) => (
  <div className="card border-0 shadow-sm rounded-4 hover-lift mb-4">
    <div className="card-header border-0 bg-white p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1 fw-bold">Order #{order._id.slice(-6).toUpperCase()}</h5>
          <div className="text-muted d-flex align-items-center">
            <FaClock className="me-2 "/>
            <div className="d-flex flex-column">
            <span>
             {moment(order?.createdAt).fromNow()}
            </span> 
            

           <span>
            {moment(order?.createdAt).format('MMM D, YYYY HH:mm' )}
            </span>  
            </div>
        
            
                      
          </div>
        </div>
        <div className="d-flex flex-column align-items-end">
          <span className={`badge bg-${getStatusColor(order?.status)} text-white rounded-pill px-4 py-2 mb-2`}>
            {order?.status}
          </span>
          <div className="text-muted">
            <FaRupeeSign className="me-1" />
            {order?.payment?.razorpay_payment_id ? 
              <span className="text-success fw-semibold">Paid</span> : 
              <span className="text-danger fw-semibold">Pending</span>
            }
          </div>
        </div>
      </div>
    </div>

    <div className="card-body p-4">
      {order?.products?.map((item, idx) => (
        <div key={idx} className="d-flex align-items-center mb-3 p-3 bg-light rounded-4 hover-shadow transition">
          <img
            src={item?.image}
            alt={item?.name}
            className="rounded-3 me-4"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <div className="flex-grow-1">
            <h6 className="fw-bold mb-2">{item?.name}</h6>
            <p className="text-muted mb-0">{item?.description}</p>
          </div>
          <div className="ms-4">
            <div className="h5 fw-bold text-primary mb-0">₹{item?.price}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [sortNewest, setSortNewest] = useState(true);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/getorders`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      const data = response.data;
      
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log("Get Orders Error:", error);
    }
  };

  const getSortedOrders = () => {
    return [...orders].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortNewest ? dateB - dateA : dateA - dateB;
    });
  };

  useEffect(() => {
    getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Orders"} description={"Your Orders"}>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">
                    <FaShoppingBag className="me-2" />
                    My Orders
                  </h4>
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => setSortNewest(!sortNewest)}
                  >
                    <FaSort className="me-2" />
                    {sortNewest ? "Newest First" : "Oldest First"}
                  </button>
                </div>
              </div>
              <div className="card-body">
                {getSortedOrders()?.map((order, index) => (
                  <OrderCard key={index} order={order} />
                ))}
                
                {orders.length === 0 && (
                  <div className="text-center py-4">
                    <h5 className="text-muted">No orders found</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
