import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Confirmed your identity title', () => {
  render(<App />);
  const title = screen.getByText(/Let's confirmed your identity/i);
  expect(title).toBeInTheDocument();
});
