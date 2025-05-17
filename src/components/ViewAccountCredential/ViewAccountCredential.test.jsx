import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ViewAccountCredential from './ViewAccountCredential';

describe('ViewAccountCredential', () => {
  const renderPage = () =>
    render(
        <ViewAccountCredential />
    );

  it('renders ViewAccountCredential page', () => {
    renderPage();
    expect(<ViewAccountCredential />).toBeTruthy();
  });
});