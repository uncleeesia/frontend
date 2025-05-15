import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReviewCard from './ReviewCard';

describe('ReviewCard', () => {
  it('renders without crashing', () => {
    const { container } = render(<ReviewCard />);
    expect(container).toBeTruthy();
  });
});