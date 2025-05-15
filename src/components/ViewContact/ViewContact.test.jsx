import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ViewContact from "./ViewContact";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));
describe("ViewContact", () => {
  const renderPage = () => render(<ViewContact />);

  it("renders ViewContact page", () => {
    renderPage();
    expect(<ViewContact />).toBeTruthy();
  });
});
