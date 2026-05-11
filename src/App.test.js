import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome header', () => {
  render(<App />);
  const header = screen.getByRole('heading', { level: 1 });
  expect(header).toHaveTextContent(/welcome to zuri gaming/i);
});
