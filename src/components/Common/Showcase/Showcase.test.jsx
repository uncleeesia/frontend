import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Showcase from "./Showcase";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("Showcase", () => {
  it("renders without crashing", () => {
    const { container } = render(<Showcase />);
    expect(container).toBeTruthy();
  });
});
