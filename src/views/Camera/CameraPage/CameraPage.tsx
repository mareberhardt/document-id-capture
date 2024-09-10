import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout/MainLayout';
import CircularButton from '../../../components/forms/CircularButton/CircularButton';
import './CameraPage.scss';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment"
};

const CameraPage: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      navigate('/preview', { state: { capturedImage: capturedImage ? capturedImage : imageSrc } });
    }
  }, [webcamRef]);

  return (
    <MainLayout layoutClass="camera-layout">
      <div className="camera-container">
        <h2 className="camera-title">Take a photo of your document's photo page</h2>
        <>
          <div className="webcam-container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="webcam"
            />
          </div>
          <p className="camera-info">Accepted documents: ID card, passport, residence permit, driver's license</p>
          <CircularButton onClick={capture} size={100} />
        </>
      </div>
    </MainLayout>
  );
}

export default CameraPage;
