import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Typography from './Typography';

describe('Typography', () => {
  it('renders without crashing', () => {
    const { container } = render(<Typography />);
    expect(container).toBeTruthy();
  });
});