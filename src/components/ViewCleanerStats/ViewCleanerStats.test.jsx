import { describe, it, expect, beforeAll } from "vitest";
import ViewCleanerStats from "./ViewCleanerStats";
import { render } from "@testing-library/react";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));
describe("ViewCleanerStats", () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });
  it("renders ViewCleanerStats component", () => {
    render(<ViewCleanerStats />);
    expect(<ViewCleanerStats />).toBeTruthy();
  });
});
