import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PreviewPage from './PreviewPage'; // Adjust the import path as necessary
import '@testing-library/jest-dom/extend-expect';

const mockNavigate = jest.fn();

// Mock the `useNavigate` hook to intercept the navigation behavior
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('PreviewPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Should render "No image captured" if there's no captured image
  it('renders the fallback when no image is captured', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/preview', state: {} }]}>
        <Routes>
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Verify fallback message and "Go Back" button are rendered
    expect(screen.getByText('No image captured. Please go back and take a photo.')).toBeInTheDocument();
    const goBackButton = screen.getByRole('button', { name: /Go Back/i });
    expect(goBackButton).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/camera');
  });

  // Test 2: Should render the captured image if it exists
  it('renders the captured image', () => {
    const capturedImage = 'image-url.jpg';

    render(
      <MemoryRouter initialEntries={[{ pathname: '/preview', state: { capturedImage } }]}>
        <Routes>
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </MemoryRouter>
    );

    const img = screen.getByAltText('Captured Document');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', capturedImage);
  });

  // Test 3: Should navigate back on clicking the "Retry" button
  it('navigates back when "Retry" button is clicked', () => {
    const capturedImage = 'image-url.jpg';

    render(
      <MemoryRouter initialEntries={[{ pathname: '/preview', state: { capturedImage } }]}>
        <Routes>
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </MemoryRouter>
    );

    const retryButton = screen.getByRole('button', { name: /Retry/i });
    fireEvent.click(retryButton);

    // Expecting the navigate function to be called with -1, representing back navigation
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  // Test 4: Should navigate to confirmation page on "Submit"
  it('navigates to confirmation page when "Submit" button is clicked', () => {
    const capturedImage = 'image-url.jpg';

    render(
      <MemoryRouter initialEntries={[{ pathname: '/preview', state: { capturedImage } }]}>
        <Routes>
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </MemoryRouter>
    );

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submitButton);

    // Expect the navigate function to be called with the confirmation page and submission state
    expect(mockNavigate).toHaveBeenCalledWith('/confirmation', {
      state: { isSubmitted: true },
    });
  });
});
