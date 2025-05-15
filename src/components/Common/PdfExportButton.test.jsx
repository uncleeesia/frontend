import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PdfExportButton from './PdfExportButton';

describe('PdfExportButton', () => {
  it('renders without crashing', () => {
    const { container } = render(<PdfExportButton />);
    expect(container).toBeTruthy();
  });
});