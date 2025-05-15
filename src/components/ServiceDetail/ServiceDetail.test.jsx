import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ServiceDetail from "./ServiceDetail";
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  useSearchParams: () => [
    {
      get: (key) => {
        if (key === "id") return "1";
        return null;
      },
    },
    vi.fn(),
  ],
}));

describe("ServiceDetail", () => {
  const renderPage = () => render(<ServiceDetail />);

  it("renders ServiceDetail component", () => {
    renderPage();
    expect(<ServiceDetail />).toBeTruthy();
  });
});
