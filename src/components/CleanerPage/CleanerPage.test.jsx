import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CleanerPage from "./CleanerPage";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));
describe("CleanerPage", () => {
  const renderPage = () => render(<CleanerPage />);

  it("renders CleanerPage", () => {
    renderPage();
    expect(<CleanerPage />).toBeTruthy();
  });
});
