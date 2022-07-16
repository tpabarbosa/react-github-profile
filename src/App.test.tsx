import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { GithubProvider } from './contexts/Github';

test('renders Github Profile Viewer title', () => {
  render(
    <GithubProvider>
      <App />
    </GithubProvider>
  );
  const linkElement = screen.getByText(/Github Profile Viewer/i);
  expect(linkElement).toBeInTheDocument();
});
