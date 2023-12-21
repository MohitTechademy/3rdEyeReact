import React, { useState, useRef, useEffect } from 'react';
import './cameraComponent.scss';

const CameraComponent = () => {
  const [videoStream, setVideoStream] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  useEffect(() => {
 startCamera();
  }, []);

  useEffect(() => {
    if (videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <div>
     <h1  className='textCenter'>3rd Aeye Camera View</h1>
      <div style={{ marginTop: '20px' }}>
        {videoStream && (
          <div className='video-size'>
            <video ref={videoRef} autoPlay playsInline />
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;