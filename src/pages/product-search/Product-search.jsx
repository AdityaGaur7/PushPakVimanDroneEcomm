import React, { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaSearch, FaFilter } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../api.js";
import { toast } from "react-hot-toast";
import "./product-search.css";
import Layout from "../../MainComponent/Layout.jsx";
import { useCart } from "../../Context/cart.jsx";
import { useNavigate } from "react-router-dom";


const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const { keyword } = useParams();
  const { cart, setCart } = useCart();
  const productsPerPage = 12;
  const navigate = useNavigate();

  // Get all products and filter based on keyword
  useEffect(() => {
    getAllProducts();
  }, []);

  // Filter products when keyword changes
  useEffect(() => {
    if (products.length > 0 && keyword) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(keyword.toLowerCase()) ||
        product.description.toLowerCase().includes(keyword.toLowerCase()) ||
        product.category.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    setCurrentPage(1);
    setIsLoading(false);
  }, [keyword, products]);

  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${API_URL}/api/product/get-product`);
      if (data.success) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };

  // Sorting handler
  const handleSort = (e) => {
    const value = e.target.value;
    let sorted = [...filteredProducts];

    switch (value) {
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  };
  const handleAddToCart=(product)=>{
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
    let updatedCart;

    if (existingProductIndex >= 0) {
      // Product already in cart, update quantity
      updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Product not in cart, add with quantity 1
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("PushPakCart", JSON.stringify(updatedCart));
    toast.success("Added to cart");
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
    let updatedCart;

    if (existingProductIndex >= 0) {
      // Product already in cart, update quantity
      updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Product not in cart, add with quantity 1
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("PushPakCart", JSON.stringify(updatedCart));
    toast.success("Added to cart");
  };

  return (
    <Layout>

   
    <div className="container-fluid px-4 py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold mb-3">
          Discover Premium Tech
          {keyword && <span className="text-primary"> • {keyword}</span>}
        </h2>
        <p className="text-muted mx-auto lead" style={{ maxWidth: '800px' }}>
          Explore our curated collection of cutting-edge technology, from premium drones 
          to professional electronics and custom 3D printing solutions.
        </p>
      </div>

      {/* Filters and Sort Section */}
      <div className="filter-section d-flex justify-content-between align-items-center mb-4 p-4">
        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center gap-2">
            <FaFilter className="text-primary" />
            <span className="fw-medium">Filters</span>
          </div>
          <div className="vr"></div>
          <div className="text-muted">
            <span className="fw-medium">{filteredProducts.length}</span> 
            {filteredProducts.length === 1 ? ' product' : ' products'}
          </div>
        </div>
        <select 
          className="form-select sort-select w-auto" 
          onChange={handleSort}
        >
          <option value="">Sort by: Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="name_desc">Name: Z to A</option>
        </select>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="col">
              <div className="card product-card">
                <div className="product-image-container skeleton-loader"></div>
                <div className="card-body">
                  <div className="skeleton-loader" style={{height: "20px", width: "80%", marginBottom: "10px"}}></div>
                  <div className="skeleton-loader" style={{height: "20px", width: "50%"}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : currentProducts.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
          {currentProducts.map((product) => (
            <div className="col" key={product._id}>
              <div className="card product-card h-100">
                <div className="product-image-container">
                  <Link to={`/product/${product.slug}`} className="product-image-link">
                    <img
                      src={product.image}
                      className="product-image"
                      alt={product.name}
                      loading="lazy"
                    />
                  </Link>
                  <div className="product-overlay">
                    <div className="d-flex gap-2 justify-content-end">
                  
                      <button 
                        className="product-action-btn"
                        title="Add to Cart"
                        onClick={() => addToCart(product)}
                      >
                        <FaShoppingCart size={16} /> 
                      </button>
                      {/* <button 
                        className="product-action-btn"
                        title="Add to Wishlist"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <FaHeart size={16} />
                      </button> */}
                    </div>
                  </div>
                </div>
                <div className="card-body d-flex flex-column p-3">
                  <Link 
                    to={`/product/${product.slug}`} 
                    className="text-decoration-none"
                  >
                    <h5 className="product-title text-truncate mb-2">
                      {product.name}
                    </h5>
                  </Link>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <p className="text-primary fw-bold mb-0">
                      ₹{product.price.toLocaleString()}
                    </p>
                    {product.category && (
                      <span className="badge bg-light text-dark">
                        {product.category}
                      </span>
                    )}
                  </div>
                  <button
                      onClick={() => navigate(`/productdetails/${product.slug}`)}
                      className="btn btn-outline-primary w-100"
                    >
                      View Details
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="no-results">
            <div className="mb-4">
              <FaSearch size={48} className="text-muted" />
            </div>
            <h3 className="h4 mb-3">No products found {keyword && `for "${keyword}"`}</h3>
            <p className="text-muted mb-4">
              Try checking your spelling or using more general terms
            </p>
            <Link to="/products" className="btn btn-primary rounded-pill px-4">
              Browse All Products
            </Link>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-5" aria-label="Product pagination">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link rounded-start"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                className={`page-item ${page === currentPage ? "active" : ""}`}
                key={page}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link rounded-end"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
    </Layout>
  );
};

export default ProductSearch;
