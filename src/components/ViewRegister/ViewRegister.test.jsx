import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ViewRegister from "./ViewRegister";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));
describe("ViewRegister", () => {
  const renderPage = () => render(<ViewRegister />);

  it("renders ViewRegister form", () => {
    renderPage();
    expect(<ViewRegister />).toBeTruthy();
  });
});
