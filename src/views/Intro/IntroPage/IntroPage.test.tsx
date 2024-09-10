import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import IntroPage from './IntroPage'; // Adjust the import path accordingly

describe('IntroPage', () => {
  // Test 1: Ensure the IntroPage renders with the correct text content
  it('renders the IntroPage with the correct text', () => {
    render(
      <Router>
        <IntroPage />
      </Router>
    );

    // Assert that the heading and paragraph are rendered
    expect(screen.getByText("Let's confirmed your identity")).toBeInTheDocument();
    expect(screen.getByText("We'll ask you for you id and a selfie. It's quick and secure, and trusted by millions of users worldwide")).toBeInTheDocument();
  });

  // Test 2: Ensure the "Let's go!" button is rendered and navigates to /warmup
  it('renders the "Let\'s go!" button with the correct link', () => {
    render(
      <Router>
        <IntroPage />
      </Router>
    );

    // Get the link wrapping the "Let's go!" button and check its href attribute
    const link = screen.getByRole('link', { name: /let's go!/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/warmup');
  });
});
