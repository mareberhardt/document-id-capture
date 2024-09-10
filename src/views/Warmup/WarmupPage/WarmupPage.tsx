import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout/MainLayout';


const WarmupPage: FunctionComponent = () => {
  return (
    <MainLayout>
      <div className="capture-container">
        <h2>We need to access to you camera in order to continue</h2>
        <p>When prompted, please "Allow" to proceed with the verification</p>
        <div className="capture-buttons">
          <div className="center">
            <Link to="/camera">
              <button>Continue</button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default WarmupPage;