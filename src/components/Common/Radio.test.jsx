import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Radio from './Radio';

describe('Radio', () => {
    it('renders without crashing', () => {
        const options = [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' }
        ];
        const { container } = render(<Radio options={options} />);
        expect(container).toBeTruthy();
      });
});