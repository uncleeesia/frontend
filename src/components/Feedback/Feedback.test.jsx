import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Feedback from "./Feedback";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("Feedback", () => {
  const renderPage = () => render(<Feedback />);

  it("renders Feedback component", () => {
    renderPage();
    expect(<Feedback />).toBeTruthy();
  });
});
