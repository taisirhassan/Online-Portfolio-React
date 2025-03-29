import React from 'react';
import { useNavigate } from 'react-router-dom';
import Now from '../components/Now';
import '../styles/NowPage.scss';

const NowPage = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1); // This navigates back one entry in the history stack
  };
  
  return (
    <div className="now-page">
      <div className="now-page__container">
        <div className="now-page__header">
          <button onClick={handleGoBack} className="now-page__back-btn">
            <span className="now-page__back-icon">←</span> Back to home
          </button>
        </div>
        <Now />
      </div>
    </div>
  );
};

export default NowPage; 