import { useEffect, useState } from "react";
import Layout from "../../MainComponent/Layout.jsx";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../api.js";
import { FaEdit, FaTrash, FaSave, FaPlus } from 'react-icons/fa';
import { Cloudinary } from '@cloudinary/url-gen';

const styles = {
  formActions: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px'
  },
  button: {
    minWidth: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px 16px'
  },
  productImage: {
    marginTop: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  uploadStatus: {
    marginTop: '8px',
    textAlign: 'center',
    color: '#666'
  }
};

const CreateProduct = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([
    "Drone",
    "3D-Printing-Object",
    "IOT-component",
  ]); // State for categories
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(""); // Selected category
  const [updateId, setUpdateId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dqmf2mh8d' // replace with your cloud name if different
    }
  });

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/product/get-product`);
      if (data.success) {
        setProduct(data.products);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products");
    }
  };

  // Handle creating a new product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_URL}/api/product/create-product`,
        { name, price, description, image, category }
      );
      if (data.success) {
        toast.success(data.message);
        getAllProducts();
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating product");
    }
  };

  // Handle updating an existing product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${API_URL}/api/product/update-product/${updateId}`,
        { name, price, description, image, category }
      );
      if (data.success) {
        toast.success(data.message);
        getAllProducts();
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating product");
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/api/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setCategory(product.category); // Set selected category
    setUpdateId(product._id);
  };

  // Reset form fields
  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setCategory(""); // Reset selected category
    setUpdateId(null);
  };

  // Add this new function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'cloudinary_folder'); 
      formData.append('cloud_name', 'dqmf2mh8d'); 

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dqmf2mh8d/image/upload`, {
          method:"POST",
          body:formData
        });

        const uploadedImageURL = await response.json();
        // console.log(uploadedImageURL.secure_url);
        


        setImage(uploadedImageURL.secure_url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products and categories on component mount
  useEffect(() => {
    getAllProducts();
    // Fetch categories
  }, []);

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
                <h2>{updateId ? 'Update Product' : 'Create New Product'}</h2>
                <p className="text-muted">
                  {updateId ? 'Update product information' : 'Add a new product to your store'}
                </p>
              </div>

              <div className="product-form-container">
                <form onSubmit={updateId ? handleUpdateProduct : handleCreateProduct}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Product Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Price</label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Product Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={loading}
                        />
                        {loading && (
                          <div style={styles.uploadStatus}>
                            <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <span>Uploading image...</span>
                          </div>
                        )}
                        {image && (
                          <div style={styles.productImage}>
                            <img
                              src={image}
                              alt="product preview"
                              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          className="form-select"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat, id) => (
                            <option key={id} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions" style={styles.formActions}>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      style={styles.button}
                      disabled={loading}
                    >
                      {updateId ? (
                        <>
                          <FaSave /> <span>Update Product</span>
                        </>
                      ) : (
                        <>
                          <FaPlus /> <span>Create Product</span>
                        </>
                      )}
                    </button>
                    {updateId && (
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        style={styles.button}
                        onClick={resetForm}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="products-table-container">
                <h3>Product List</h3>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="product-thumbnail"
                            />
                          </td>
                          <td>
                            <div className="product-name">{item.name}</div>
                            <small className="text-muted">{item.description.substring(0, 50)}...</small>
                          </td>
                          <td>${item.price}</td>
                          <td>
                            <span className="category-badge">{item.category}</span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditProduct(item)}
                              >
                                <FaEdit /> Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteProduct(item._id)}
                              >
                                <FaTrash /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
