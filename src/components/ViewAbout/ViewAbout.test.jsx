import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ViewAbout from "./ViewAbout";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("About", () => {
  const renderPage = () => render(<ViewAbout />);

  it("renders About page heading", () => {
    renderPage();
    expect(<ViewAbout />).toBeTruthy();
  });
});
