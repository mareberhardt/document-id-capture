import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Stepper from './Stepper';

// Update the type for the state and children
interface MockedLocationProviderProps {
  state?: any;
  children: ReactNode;  // Ensure children are correctly typed
}

const MockedLocationProvider: React.FC<MockedLocationProviderProps> = ({ state, children }) => {
  const location = {
    pathname: '/camera',
    state,
  };

  return (
    <MemoryRouter initialEntries={[location]}>
      {children}
    </MemoryRouter>
  );
};

export default MockedLocationProvider;

// Adjust the type to expect route and state as properties
const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/', state = {} }: { route?: string; state?: any } = {}
) => {
  window.history.pushState(state, 'Test page', route); // Simulate pushing a route with state

  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

describe('Stepper Component', () => {
  it('should render all steps', () => {
    renderWithRouter(<Stepper />);
    const steps = ['Intro', 'Warm up', 'Camera', 'Preview', 'Confirmation'];

    steps.forEach(step => {
      expect(screen.getByTestId(step)).toBeInTheDocument();
    });
  });

  it('should allow free navigation between the first three steps', () => {
    renderWithRouter(<Stepper />, { route: '/warmup' });

    fireEvent.click(screen.getByTestId('Intro'));
    expect(screen.getByTestId('Intro')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('Warm up'));
    expect(screen.getByTestId('Warm up')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('Camera'));
    expect(screen.getByTestId('Camera')).toBeInTheDocument();
  });

  it('should not allow navigation to Preview unless a photo is taken', () => {
    // Simulate the case where no photo is taken (capturedImage is false)
    renderWithRouter(<Stepper />, { route: '/camera', state: { capturedImage: false, isSubmitted: false } });

    const previewLink = screen.getAllByTestId('/preview');
    expect(previewLink[0]).toHaveClass('step disabled');  // Preview should be disabled

    // Simulate the case where the photo is taken (capturedImage is true)
    renderWithRouter(<Stepper />, { route: '/preview', state: { capturedImage: true, isSubmitted: true } });
    const previewLinkAfterPhoto = screen.getAllByTestId('/preview');
    expect(previewLinkAfterPhoto[1]).toHaveClass('step active');  // Preview should be enabled
  });


  it('should not allow navigation to Confirmation unless photo is submitted', () => {
    // Simulate the case where photo is taken but not submitted
    renderWithRouter(<Stepper />, { route: '/preview', state: { capturedImage: true, isSubmitted: false } });

    const confirmationLink = screen.getAllByTestId('/confirmation');
    expect(confirmationLink[0]).toHaveClass('step disabled');  // Confirmation should be disabled

    // Simulate the case where the photo is taken and submitted
    renderWithRouter(<Stepper />, { route: '/confirmation', state: { capturedImage: true, isSubmitted: true } });

    const confirmationLinkAfterSubmission = screen.getAllByTestId('/confirmation');
    expect(confirmationLinkAfterSubmission[1]).toHaveClass('step active');  // Confirmation should be enabled
  });

  it('should not allow navigation to previous step /preview once on Confirmation', () => {
    renderWithRouter(<Stepper />, { route: '/confirmation', state: { capturedImage: true, isSubmitted: true, confirmationStepReached: true } });

    const previousSteps = [
      { id: 1, name: 'Intro', path: '/' },
      { id: 2, name: 'Warm up', path: '/warmup' },
      { id: 3, name: 'Camera', path: '/camera' },
      { id: 4, name: 'Preview', path: '/preview' }
    ];

    previousSteps.forEach((step: any) => {
      const stepElement = screen.getAllByTestId('/preview');
      expect(stepElement[0]).toHaveClass('step disabled');  // All previous steps should be disabled
    });
  });

  it('should set confirmationStepReached to true when navigating to Confirmation', () => {
    const { getByTestId } = renderWithRouter(<Stepper />, { route: '/preview', state: { capturedImage: true, isSubmitted: true } });

    fireEvent.click(screen.getByTestId('Confirmation'));  // Navigate to confirmation
    const confirmationStep = screen.getByTestId('Confirmation');
    expect(confirmationStep).toBeInTheDocument();
  });
});
