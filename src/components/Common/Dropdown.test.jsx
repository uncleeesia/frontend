import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  it('renders without crashing', () => {
    const { container } = render(<Dropdown />);
    expect(container).toBeTruthy();
  });
});