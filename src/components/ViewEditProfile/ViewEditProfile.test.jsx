import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ViewEditProfile from './ViewEditProfile';

describe('ViewEditProfile', () => {
  const renderPage = () =>
    render(
        <ViewEditProfile />
    );

  it('renders ViewEditProfile page', () => {
    renderPage();
    expect(<ViewEditProfile />).toBeTruthy();
  });
});