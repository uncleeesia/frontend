import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ServiceCard from './ServiceCard';
vi.mock("react-router-dom", () => ({
    useNavigate: () => vi.fn(),
  }));
  
describe('ServiceCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<ServiceCard />);
    expect(container).toBeTruthy();
  });
});