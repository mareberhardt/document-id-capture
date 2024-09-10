import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout/MainLayout';
import './IntroPage.scss'

const IntroPage: FunctionComponent = () => {
  return (
    <MainLayout>
      <div className="capture-container">
        <h2>Let's confirmed your identity</h2>
        <p>We'll ask you for you id and a selfie. It's quick and secure, and trusted by millions of users worldwide</p>
      </div>
      <div className="capture-buttons">
        <div className="center">
          <Link to="/warmup">
            <button>Let's go!</button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default IntroPage;