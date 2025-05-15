import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Modal from './Modal';

describe('Modal', () => {
  it('renders without crashing', () => {
    const { container } = render(<Modal />);
    expect(container).toBeTruthy();
  });
});