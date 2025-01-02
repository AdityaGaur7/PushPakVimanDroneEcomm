import Layout from "../../MainComponent/Layout.jsx";
import { useAuth } from "../../Context/auth.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/cart.jsx";
import { API_URL } from "../../api.js";
import axios from "axios";
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import toast from "react-hot-toast";

const Cart = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const totalPrices = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };

  const removeCardItem = (id) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === id);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("PushPakCart", JSON.stringify(myCart));
  };

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("PushPakCart", JSON.stringify(updatedCart));
  };

  const handlePayment = async () => {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const response = await axios.post(
      `${API_URL}/api/payment/order`,
      {
        amount: totalAmount,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;

    if (!data.success) {
      alert("Error creating Razorpay order");
      return;
    }

    const options = {
      key: "rzp_test_mn0PTHHGYdjsI8", // Replace with your Razorpay Key
      amount: data.order.amount,
      currency: data.order.currency,
      name: "E-Commerce Store",
      description: "Order Payment",
      image: "/logo.png",
      order_id: data.order.id,
      handler: async (response) => {
        try {
          const verifyResponse = await axios.post(
            `${API_URL}/api/payment/verify`,
            {
              response,
              products: cart,
              buyer: auth?.user?.id,
              address: auth?.user?.address,
              totalPrice: totalAmount,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const verifyData = verifyResponse.data;
          if (verifyData.success) {
            // Update cart and remove items
            setCart([]);
            localStorage.removeItem("PushPakCart");

            toast.success("payment Succesfull")
            navigate("/dashboard/user/orders"); // Redirect after payment success
          } else {
            toast.error("Payment Verification Failed");
          }
        } catch (error) {
          console.error(error);
        }
      },
      prefill: {
        name: auth?.user?.name || "Guest",
        email: auth?.user?.email || "guest@example.com",
        contact: auth?.user?.phone,
      },
      theme: {
        color: "#4c9060",
      },
      method: {
        netbanking: true,
        card: true,
        upi: true,
        wallet: true,
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <Layout title={"Cart"} description={"Cart"}>
      <div className="container py-5">
        <h1 className="display-5 fw-bold mb-4">
          <FaShoppingCart className="me-2" />
          Shopping Cart {cart.length > 0 && 
            <span className="badge bg-primary rounded-pill ms-2">{cart.length}</span>
          }
          
        </h1>
        
        <div className="row g-4">
          {/* Cart Items Section */}
          <div className="col-lg-8">
            {cart?.length === 0 ? (
              <div className="text-center py-5 bg-light rounded">
                <h2 className="h4 text-secondary mb-4">Your cart is empty</h2>
                
                <button 
                  onClick={() => navigate('/products')}
                  className="btn btn-primary btn-lg rounded-pill px-4"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {cart?.map((item, index) => (
                  <div
                    key={index}
                    className="card border-0 shadow-sm"
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded-start h-100 object-fit-cover"
                          style={{ maxHeight: '200px' }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start">
                            <h4 className="card-title h5">{item.name}</h4>
                            <button
                              className="btn btn-link text-danger p-0"
                              onClick={() => removeCardItem(item._id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                          <p className="card-text text-secondary text-truncate-2">
                            {item.description}
                          </p>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <p className="card-text fs-5 fw-bold text-primary mb-0">
                              ₹{item.price.toLocaleString()} × {item.quantity}
                            </p>
                            <p className="card-text fs-5 fw-bold text-success mb-0">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <div className="btn-group">
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="btn btn-outline-secondary disabled">
                                {item.quantity}
                              </span>
                              <button
                                className="btn btn-outline-secondary"
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary Section */}
          {cart.length > 0 && (
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm position-sticky" style={{ top: '1rem' }}>
                <div className="card-body">
                  <h2 className="card-title h4 mb-4">Order Summary</h2>
                  
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-between border-bottom pb-3">
                      <span className="text-secondary">Subtotal ({cart.length} items)</span>
                      <span className="fw-medium">{totalPrices()}</span>
                    </div>
                    
                    {/* Address Section */}
                    <div className="border-bottom pb-3">
                      <h4 className="h6 fw-bold mb-3">Delivery Address</h4>
                      {auth?.user?.address ? (
                        <>
                          <p className="text-secondary mb-2">{auth.user.address}</p>
                          <button
                            className="btn btn-link p-0 text-decoration-none"
                            onClick={() => navigate("/dashboard/user/profile")}
                          >
                            Change Address
                          </button>
                        </>
                      ) : (
                        <div>
                          {auth?.token ? (
                            <button
                              className="btn btn-link p-0 text-decoration-none"
                              onClick={() => navigate("/dashboard/user/profile")}
                            >
                              Add Delivery Address
                            </button>
                          ) : (
                            <button
                              className="btn btn-link p-0 text-decoration-none"
                              onClick={() => navigate("/login", { state: "/cart" })}
                            >
                              Login to Proceed
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Total and Checkout Button */}
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between fw-bold fs-5">
                        <span>Total Amount</span>
                        <span className="text-primary">{totalPrices()}</span>
                      </div>

                      <button
                        className="btn btn-primary btn-lg w-100"
                        onClick={handlePayment}
                        disabled={!auth?.user?.address}
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
