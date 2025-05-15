import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Register from "./Register";
vi.mock("react-router-dom", () => ({
    useNavigate: () => vi.fn(),
  }));
describe("Register", () => {
  const renderPage = () => render(<Register />);

  it("renders Register form", () => {
    renderPage();
    expect(<Register />).toBeTruthy();
  });
});
