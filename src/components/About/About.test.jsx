import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import About from "./About";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("About", () => {
  const renderPage = () => render(<About />);

  it("renders About page heading", () => {
    renderPage();
    expect(<About />).toBeTruthy();
  });
});
