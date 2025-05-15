import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ViewCleanerPage from "./ViewCleanerPage";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));
describe("ViewCleanerPage", () => {
  const renderPage = () => render(<ViewCleanerPage />);

  it("renders ViewCleanerPage", () => {
    renderPage();
    expect(<ViewCleanerPage />).toBeTruthy();
  });
});
