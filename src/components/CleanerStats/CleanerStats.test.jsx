import { describe, it, expect, beforeAll } from "vitest";
import CleanerStats from "./CleanerStats";
import { render } from "@testing-library/react";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));
describe("CleanerStats", () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });
  it("renders CleanerStats component", () => {
    render(<CleanerStats />);
    expect(<CleanerStats />).toBeTruthy();
  });
});
