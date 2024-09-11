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

  // Test 1: Should render the captured image if it exists
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

  // Test 2: Should navigate back on clicking the "Retry" button
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

  // Test 3: Should navigate to confirmation page on "Submit"
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
