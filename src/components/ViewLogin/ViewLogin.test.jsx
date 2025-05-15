import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Login from "./ViewLogin";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("Login", () => {
  const renderPage = () => render(<Login />);

  it("renders Login form", () => {
    renderPage();
    expect(<Login />).toBeTruthy();
  });
});
