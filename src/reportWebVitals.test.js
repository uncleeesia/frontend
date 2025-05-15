import { describe, it, expect, vi } from 'vitest';
import reportWebVitals from './reportWebVitals';
vi.mock("web-vitals", () => ({
    getCLS: vi.fn(),
    getFID: vi.fn(),
    getFCP: vi.fn(),
    getLCP: vi.fn(),
    getTTFB: vi.fn(),
  }));
describe('reportWebVitals', () => {
  it('exports a function', () => {
    expect(typeof reportWebVitals).toBe('function');
  });

  it('can be called without crashing', () => {
    // Optional: pass a mock function if reportWebVitals expects an argument
    expect(() => {
      reportWebVitals(vi.fn());
    }).not.toThrow();
  });
});