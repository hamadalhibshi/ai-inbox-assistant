import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBackHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <button onClick={handleGoBackHome} className="home-button">
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
