import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setcount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setcount((prev) => --prev);
    }, 1000);

    if (count === 0)
      navigate('/');

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <div 
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa"
      }}
    >
      <div className="d-flex flex-column align-items-center gap-3">
        <div className="spinner-border text-primary" 
          style={{ 
            width: "3rem", 
            height: "3rem" 
          }} 
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <h2 className="text-center" style={{ color: "#0d6efd" }}>
          Redirecting in {count} second{count !== 1 ? 's' : ''}
        </h2>
      </div>
    </div>
  );
};

export default Spinner;
