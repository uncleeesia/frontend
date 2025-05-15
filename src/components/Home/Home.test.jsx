import { render } from "@testing-library/react";
import Home from "./Home";
import { beforeEach, vi } from "vitest";
import axios from "axios";

vi.mock("axios");

describe("Simple working test", () => {
  beforeEach(() => {
    vi.mock("react-router-dom", () => ({
      useNavigate: () => vi.fn(),
    }));

    axios.get.mockResolvedValue({
      data: {
        preferences: {
          id: 1,
          theme: "light",
          HouseCleaning: false,
          CarCleaning: false,
          BathroomCleaning: true,
          WindowCleaning: true,
          Indonesian: true,
          Filipino: false,
          Burmese: false,
          Vietnamese: false,
        },
      },
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Component is truthy", () => {
    const component = render(<Home />);

    expect(component).toBeTruthy();
  });
});
