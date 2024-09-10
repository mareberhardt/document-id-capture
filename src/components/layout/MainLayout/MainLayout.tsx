import React from 'react';
import { Link } from 'react-router-dom';
import Stepper from '../../forms/Stepper/Stepper';
import './MainLayout.scss';

interface MainLayoutProps {
  children: React.ReactNode; // Allow any nested components within the layout
  layoutClass?: string; // Optional prop for the layout class
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, layoutClass }) => {
  return (
    <div className={layoutClass || 'main-layout'}>
      <div className="flex-container">
        <div className="flex-column">
          <Link to="/">
            <button className="close-button">X</button>
          </Link>
        </div>
      </div>
      <div>
        <Stepper />
      </div>
      <main className="main-content">
        {children} {/* Render child components here */}
      </main>
      <div className={`${layoutClass}-overlay`}>
        <div className={`${layoutClass}-mask`}></div>
      </div>
      <footer className="main-footer">
        <p>Read more about data processing in Veriff's <Link className="main-footer-policy-link" to={"https://www.veriff.com/privacy-notice"}>Privacy Policy</Link>.</p>
      </footer>
    </div>
  );
};

export default MainLayout;