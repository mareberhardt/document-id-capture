import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import WarmupPage from './WarmupPage';

describe('WarmupPage', () => {
  // Test 1: Ensure the WarmupPage renders the correct text content
  it('renders the WarmupPage with the correct text', () => {
    render(
      <Router>
        <WarmupPage />
      </Router>
    );

    // Check if the heading and paragraph are displayed correctly
    expect(screen.getByText('We need to access to you camera in order to continue')).toBeInTheDocument();
    expect(screen.getByText('When prompted, please "Allow" to proceed with the verification')).toBeInTheDocument();
  });

  // Test 2: Ensure the "Continue" button is rendered and has the correct link to /camera
  it('renders the "Continue" button and links to /camera', () => {
    render(
      <Router>
        <WarmupPage />
      </Router>
    );

    // Check if the button "Continue" exists and the link is correct
    const link = screen.getByRole('link', { name: /continue/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/camera');
  });
});
