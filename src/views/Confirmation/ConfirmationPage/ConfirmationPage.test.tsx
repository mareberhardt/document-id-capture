import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ConfirmationPage from './ConfirmationPage'; // Adjust the import path accordingly

describe('ConfirmationPage', () => {
  // Test 1: Ensure the component renders correctly
  it('should render the confirmation page', () => {
    render(
      <Router>
        <ConfirmationPage />
      </Router>
    );

    expect(screen.getByText(/Thank you!/i)).toBeInTheDocument();
    expect(screen.getByText(/Your verification data has been successfully submitted/i)).toBeInTheDocument();
  });

  // Test 2: Verify that confirmationStepReached is true and content is rendered
  it('should set confirmationStepReached to true and render the content', () => {
    render(
      <Router>
        <ConfirmationPage />
      </Router>
    );

    // Check if the confirmationStepReached content is rendered
    expect(screen.getByText('Thank you!')).toBeInTheDocument();
    expect(screen.getByText('Your verification data has been successfully submitted')).toBeInTheDocument();
  });

  // Test 3: Ensure the "Continue" button is rendered with correct link
  it('should render the "Continue" button with the correct link', () => {
    render(
      <Router>
        <ConfirmationPage />
      </Router>
    );

    // Get the link wrapping the "Continue" button and check its href attribute
    const link = screen.getByRole('link', { name: /continue/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://veriff.com/');
  });
});
