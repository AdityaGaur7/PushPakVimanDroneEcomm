const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <h1 className="display-1">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <button 
        onClick={() => window.location.href = '/'}
        className="btn btn-primary mt-3"
      >
        Return to Homepage
      </button>
    </div>
  );
};

export default NotFound; 