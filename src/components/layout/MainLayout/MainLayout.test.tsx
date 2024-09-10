// MainLayout.test.tsx

import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './MainLayout';
import '@testing-library/jest-dom';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<Router>{ui}</Router>);
};

describe('MainLayout Component', () => {
  test('renders MainLayout with children and default class', () => {
    renderWithRouter(<MainLayout><div>Child Content</div></MainLayout>);
    
    // Check if child content is rendered
    expect(screen.getByText('Child Content')).toBeInTheDocument();
    
    // Check if default layout class is applied by checking specific elements
    expect(screen.getByRole('main')).toHaveClass('main-content');
    expect(screen.getByRole('button', { name: /X/i })).toBeInTheDocument();
  });

  test('renders MainLayout with custom layout class', () => {
    renderWithRouter(<MainLayout layoutClass="custom-class"><div>Child Content</div></MainLayout>);
    
    // Check if child content is rendered
    expect(screen.getByText('Child Content')).toBeInTheDocument();
    
    // Check if custom layout class is applied by checking specific elements
    expect(screen.getByRole('main')).toHaveClass('main-content');
  });

  test('contains a close button with correct link', () => {
    renderWithRouter(<MainLayout><div>Child Content</div></MainLayout>);
    
    // Check if close button is present
    const closeButton = screen.getByRole('button', { name: /X/i });
    expect(closeButton).toBeInTheDocument();
    
    // Check if close button navigates to the home page
    const closeButtonLink = screen.getByRole('link', { name: /X/i });
    expect(closeButtonLink).toHaveAttribute('href', '/');
  });

  test('contains Stepper component', () => {
    renderWithRouter(<MainLayout><div>Child Content</div></MainLayout>);
    
    // Check if Stepper component is rendered
    expect(screen.getByTestId('/')).toBeInTheDocument();
    expect(screen.getByTestId('/warmup')).toBeInTheDocument();
    expect(screen.getByTestId('/camera')).toBeInTheDocument();
    expect(screen.getByTestId('/preview')).toBeInTheDocument();
    expect(screen.getByTestId('/confirmation')).toBeInTheDocument();
  });

  test('renders footer with Privacy Policy link', () => {
    renderWithRouter(<MainLayout><div>Child Content</div></MainLayout>);
    
    // Check if footer is present
    expect(screen.getByText(/Read more about data processing/i)).toBeInTheDocument();
    
    // Check if Privacy Policy link is present and has correct URL
    const policyLink = screen.getByRole('link', { name: /Privacy Policy/i });
    expect(policyLink).toBeInTheDocument();
    expect(policyLink).toHaveAttribute('href', 'https://www.veriff.com/privacy-notice');
  });
});
