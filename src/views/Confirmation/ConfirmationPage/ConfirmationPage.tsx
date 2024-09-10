import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout/MainLayout';
import './ConfirmationPage.scss'

const ConfirmationPage: FunctionComponent = () => {
  const [confirmationStepReached, setConfirmationStepReached] = useState<boolean>(false);

  useEffect(() => {
    setConfirmationStepReached(true);
  }, []);

  return (
    <MainLayout>
      {confirmationStepReached && (
        <div className="confirmation-container">
          <h1 className="confirmation-title">Thank you!</h1>
          <p className="confirmation-info">Your verification data has been successfully submitted</p>
          <div className="capture-buttons">
            <div className="center">
              <Link to={"https://veriff.com/"} >
                <button data-testid="continue-button" >Continue</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default ConfirmationPage;