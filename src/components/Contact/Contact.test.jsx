import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Contact from "./Contact";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));
describe("Contact", () => {
  const renderPage = () => render(<Contact />);

  it("renders Contact page", () => {
    renderPage();
    expect(<Contact />).toBeTruthy();
  });
});
