import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../MainComponent/Layout.jsx";
import axios from "axios";
import { useAuth } from "../../Context/auth.jsx";
import { useEffect, useState } from "react";
import moment from "moment";
import { API_URL } from "../../api.js";
import { Select, Input, Space, Radio } from "antd";
import { FaBox, FaClock, FaUser, FaMoneyBill, FaLocationArrow, FaSearch, FaMoneyBillWave, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import "./AdminOrders.css";

const AdminOrders = () => {
  const [status] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled"
  ]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [expandedOrders, setExpandedOrders] = useState([]);
  const { auth } = useAuth();

  const statusColors = {
    "Not Processed": "#ffa940",
    "Processing": "#1890ff",
    "Shipped": "#52c41a",
    "Delivered": "#52c41a",
    "Cancelled": "#ff4d4f"
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/all-orders`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      const data = response.data;
      // console.log("Orders Data:", data);
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log("Get Orders Error:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [auth?.token]);

  const handleChange = async (value, orderId) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      const data = response.data;
      getOrders();
      // console.log("Change Status Data:", data);
      if (data.success) {
        toast.success(data.message);
        getOrders();
      }
    } catch (error) {
      console.log("Change Status Error:", error);
    }
  };

  const getStatusBadgeStyle = (statusValue) => ({
    padding: '4px 12px',
    borderRadius: '4px',
    backgroundColor: `${statusColors[statusValue]}20`,
    color: statusColors[statusValue],
    fontWeight: 500,
    fontSize: '0.9rem'
  });

  const calculateOrderTotal = (products) => {
    return products.reduce((total, item) => total + item.price, 0);
  };

  const getFilteredAndSortedOrders = () => {
    let filtered = [...orders];
    
    filtered = filtered.filter(order => 
      order._id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (statusFilter !== "All") {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    filtered.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === "latest" ? timeB - timeA : timeA - timeB;
    });
    
    return filtered;
  };

  const toggleOrderProducts = (orderId) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 admin-sidebar">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-main">
              <div className="content-header">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2>Order Management</h2>
                    <p className="text-muted">
                      {getFilteredAndSortedOrders().length} {getFilteredAndSortedOrders().length === 1 ? 'order' : 'orders'} to manage
                    </p>
                  </div>
                 
                </div>

                <div className="filters-section mt-3">
                  <Space size="large" className="d-flex justify-content-between">
                    <div className="status-filter">
                      <span className="filter-label">Status: </span>
                      <Select
                        value={statusFilter}
                        onChange={setStatusFilter}
                        style={{ width: 150 }}
                        options={[
                          { value: 'All', label: 'All Orders' },
                          ...status.map(s => ({ value: s, label: s }))
                        ]}
                      />
                    </div>
                    <div className="time-filter">
                      <span className="filter-label">Sort by: </span>
                      <Radio.Group 
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        optionType="button"
                        buttonStyle="solid"
                      >
                        <Radio.Button value="latest">Latest First</Radio.Button>
                        <Radio.Button value="oldest">Oldest First</Radio.Button>
                      </Radio.Group>
                    </div>
                    <div className="search-container" style={{ width: '300px' }}>
                    <Input
                      placeholder="Search by Order ID"
                      prefix={<FaSearch style={{ color: '#bfbfbf' }} />}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ 
                        borderRadius: '6px',
                        padding: '8px 12px'
                      }}
                    />
                  </div>
                  </Space>
                </div>
              </div>

              <div className="orders-container">
                {getFilteredAndSortedOrders().map((order, index) => (
                  <div key={index} className="order-card">
                    <div className="order-header">
                      <div className="order-id">
                        <h4>Order #{order._id.slice(-6).toUpperCase()}</h4>
                        <span className="order-date">
                          {moment(order?.createdAt).format('MMM DD, YYYY, h:mm A')}
                        </span>
                      </div>
                      <div className="order-status">
                        <div style={getStatusBadgeStyle(order?.status)}>
                          {order?.status}
                        </div>
                        <Select
                          defaultValue={order?.status}
                          className="status-select"
                          onChange={(value) => handleChange(value, order._id)}
                          style={{ marginTop: '8px' }}
                        >
                          {status.map((item, index) => (
                            <Select.Option key={index} value={item}>
                              {item}
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    </div>

                    <div className="order-info">
                      <div className="info-item">
                        <FaUser className="info-icon" />
                        <div>
                          <span className="info-label">Customer</span>
                          <span className="info-value">{order?.buyer?.name}</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <FaClock className="info-icon" />
                        <div>
                          <span className="info-label">Order Time</span>
                          <span className="info-value">{moment(order?.createdAt).fromNow()}</span>
                          <span className="info-value">{moment(order?.createdAt).format('MMM D, YYYY HH:mm' )}</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <FaMoneyBill className="info-icon" />
                        <div>
                          <span className="info-label">Payment</span>
                          <span className={`info-value ${order?.payment?.razorpay_payment_id ? 'text-success' : 'text-danger'}`}>
                            {order?.payment?.razorpay_payment_id ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                      </div>
                      <div className="info-item">
                        <FaBox className="info-icon" />
                        <div>
                          <span className="info-label">Items</span>
                          <span className="info-value">{order?.products?.length}</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <FaLocationArrow className="info-icon" />
                        <div>
                          <span className="info-label">Address</span>
                          <span className="info-value">{order?.address}</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <FaMoneyBillWave className="info-icon" />
                        <div>
                          <span className="info-label">Total Price</span>
                          <span className="info-value">Rs. {order?.totalPrice?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      className="toggle-products-btn"
                      onClick={() => toggleOrderProducts(order._id)}
                    >
                      <span>
                        {order?.products?.length} {order?.products?.length === 1 ? 'Product' : 'Products'}
                      </span>
                      {expandedOrders.includes(order._id) ? (
                        <FaChevronUp className="toggle-icon" />
                      ) : (
                        <FaChevronDown className="toggle-icon" />
                      )}
                    </button>

                    {expandedOrders.includes(order._id) && (
                      <div className="order-products">
                        {order?.products?.map((item, index) => (
                          <div key={index} className="product-item">
                            <div className="product-img">
                              <img src={item.image} alt={item.name} />
                            </div>
                            <div className="product-details">
                              <h5>{item.name}</h5>
                              <p className="product-description">{item.description}</p>
                              <div className="product-price">₹{item.price.toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="order-summary">
                      <span className="total-amount">
                        Total: ₹{calculateOrderTotal(order?.products).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
