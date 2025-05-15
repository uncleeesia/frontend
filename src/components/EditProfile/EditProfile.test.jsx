import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EditProfile from './EditProfile';

describe('EditProfile', () => {
  const renderPage = () =>
    render(
        <EditProfile />
    );

  it('renders EditProfile page', () => {
    renderPage();
    expect(<EditProfile />).toBeTruthy();
  });
});