import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ViewFeedback from "./ViewFeedback";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("ViewFeedback", () => {
  const renderPage = () => render(<ViewFeedback />);

  it("renders ViewFeedback component", () => {
    renderPage();
    expect(<ViewFeedback />).toBeTruthy();
  });
});
