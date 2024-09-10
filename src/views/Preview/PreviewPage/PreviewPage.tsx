import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout/MainLayout';
import './PreviewPage.scss';

const PreviewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const capturedImage = location.state?.capturedImage;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const confirm = (() => {
    setIsSubmitted(true);
    navigate('/confirmation', { state: { isSubmitted: true } });
    console.log(isSubmitted)
  });

  if (!capturedImage) {
    return (
      <div className="capture-container">
        <p>No image captured. Please go back and take a photo.</p>
        <Link to="/camera">
          <button>Go Back</button>
        </Link>
      </div>
    );
  }

  return (
    <MainLayout layoutClass="camera-layout">
      <div className="camera-container">
        <div className="webcam-container">
          <img src={capturedImage} alt="Captured Document" />
        </div>
        <div className="retry-button-container">
          <button onClick={() => navigate(-1)}>Retry</button>
        </div>
        <div className="submit-button-container">
          <button onClick={confirm}>Submit</button>
        </div>
      </div>
    </MainLayout >
  );
}

export default PreviewPage;
