import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ViewServiceDetail from "./ViewServiceDetail";
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

describe("ViewServiceDetail", () => {
  const renderPage = () => render(<ViewServiceDetail />);

  it("renders ViewServiceDetail component", () => {
    renderPage();
    expect(<ViewServiceDetail />).toBeTruthy();
  });
});
