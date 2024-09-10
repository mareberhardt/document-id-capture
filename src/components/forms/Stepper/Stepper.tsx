import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Stepper.scss';

interface Step {
  id: number;
  name: string;
  path: string;
}

const steps: Step[] = [
  { id: 1, name: 'Intro', path: '/' },
  { id: 2, name: 'Warm up', path: '/warmup' },
  { id: 3, name: 'Camera', path: '/camera' },
  { id: 4, name: 'Preview', path: '/preview' },
  { id: 5, name: 'Confirmation', path: '/confirmation' },
];

const Stepper: React.FC = () => {
  const location = useLocation();
  const [isPhotoTaken, setIsPhotoTaken] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [confirmationStepReached, setConfirmationStepReached] = useState<boolean>(false);

  const findId = (path: string) => {
    const step = steps.find((s) => s.path === path);
    return step ? step.id : 0;
  }

  // Disable step navigation based on current step and actions
  const isStepDisabled = (step: Step) => {
    const currentStepIndex = findId(location.pathname);
    const targetStepIndex = findId(step.path);

    // Once user is on the confirmation screen, disable all previous steps
    if (confirmationStepReached) {
      return targetStepIndex < 4; // Disable any step before the preview (step 4)
    }

    // Allow free navigation between the first 3 steps (Intro, Warm up, Camera)
    if (targetStepIndex <= 2) return false;

    // Camera step: Disable forward navigation until the photo is taken
    if (targetStepIndex === 3 && !isPhotoTaken) return true;

    // Preview step: Disable forward navigation until the photo is taken and submitted
    if (targetStepIndex === 4 && !isPhotoTaken) return true; // Can only go to Preview if photo is taken
    if (targetStepIndex === 4 && !isSubmitted) return true;  // Can only go to Confirmation after submission

    // Confirmation step: Disable until photo is submitted in Preview
    if (targetStepIndex === 5 && !isSubmitted) return true;

    return currentStepIndex > targetStepIndex; // Allow going back to previous steps, except step 5
  };

  useEffect(() => {
    setIsPhotoTaken(location.state?.capturedImage ? true : false);
    setIsSubmitted(location.state?.isSubmitted ? true : false);
    setConfirmationStepReached(location.state?.confirmationStepReached ? true : false);
  }, [location.state]);


  return (
    <div className="stepper">
      {steps.map((step: Step) => (
        <Link key={step.id} data-testid={`${step.name}`} to={!isStepDisabled(step) ? step.path : '#'} onClick={() => {
          if (step.id === 5) setConfirmationStepReached(true);
        }}>
          <div key={step.id} data-testid={`${step.path}`} className={`step ${location.pathname === step.path
              ? 'active'
              : isStepDisabled(step)
                ? 'disabled'
                : 'deactivated'
            }`}>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Stepper;
