import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../api.js";
import Layout from "../../MainComponent/Layout.jsx";
import { FaShoppingCart, FaArrowLeft, FaRegClock } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useCart } from "../../Context/cart.jsx";
import "./ProductDetails.css";
import moment from "moment";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useCart();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("PushPakCart", JSON.stringify(updatedCart));
    } else {
      const cartItem = { ...product, quantity };
      setCart([...cart, cartItem]);
      localStorage.setItem(
        "PushPakCart",
        JSON.stringify([...cart, cartItem])
      );
    }
    toast.success("Added to cart");
  };

  if (loading) {
    return (
      <Layout>
        <div className="product-details-skeleton">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-6 skeleton-image"></div>
              <div className="col-md-6">
                <div className="skeleton-text lg"></div>
                <div className="skeleton-text md"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="product-details-page">
        <div className="container py-5">
          <Link to="/products" className="back-link mb-4">
            <FaArrowLeft /> Back to Products
          </Link>

          <div className="row g-4">
            {/* Product Image */}
            <div className="col-lg-6">
              <div className="product-image-container">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="product-image"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="col-lg-6">
              <div className="product-info">
                <div className="mb-4">
                  <span className="category-badge">
                    {product?.category}
                  </span>
                  <h1 className="product-title">{product?.name}</h1>
                  <div className="price-container">
                    <span className="price">₹{product?.price.toLocaleString()}</span>
                    <span className="tax-info">Inclusive of all taxes</span>
                  </div>
                </div>

                <div className="product-description mb-4">
                  <h5 className="description-title">Description</h5>
                  <p>{product?.description}</p>
                </div>

                <div className="product-meta mb-4">
                  <div className="meta-item">
                    <FaRegClock />
                    <span>Listed {moment(product?.createdAt).fromNow()}</span>
                  </div>
                </div>

                <div className="purchase-actions">
                  <div className="quantity-selector mb-3">
                    <label>Quantity:</label>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button 
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>

                <div className="product-features mt-4">
                  <div className="feature-item">
                    <span className="feature-icon">🚚</span>
                    <div>
                      <h6>Free Delivery</h6>
                      <p>On orders above ₹500</p>
                    </div>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">↩️</span>
                    <div>
                      <h6>Easy Returns</h6>
                      <p>7 days return policy</p>
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

export default ProductDetails;
