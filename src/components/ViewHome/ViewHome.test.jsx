import { render } from "@testing-library/react";
import ViewHome from "./ViewHome";
import { vi } from "vitest";
import axios from "axios";

vi.mock("axios");
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

describe("ViewHome Component", () => {
  const mockPreferences = {
    id: 1,
    theme: "light",
    HouseCleaning: true,
    CarCleaning: true,
    BathroomCleaning: true,
    WindowCleaning: true,
    Indonesian: true,
    Filipino: true,
    Burmese: true,
    Vietnamese: true,
  };

  const mockServiceProviders = [
    {
      id: 1,
      name: "Jane's Cleaning",
      description: "Bathroom and window cleaning services.",
      nationality: "Indonesian",
      cleaningTypes: ["BathroomCleaning", "WindowCleaning"],
      reviews: 20,
      image: "https://placehold.co/600x400",
    },
    {
      id: 2,
      name: "Sparkle Shine",
      description: "House cleaning experts.",
      nationality: "Filipino",
      cleaningTypes: ["CarCleaning"],
      reviews: 15,
      image: "https://placehold.co/600x400",
    },
    {
      id: 3,
      name: "Sparkle Shine",
      description: "House cleaning experts.",
      nationality: "Filipino",
      cleaningTypes: ["HouseCleaning"],
      reviews: 15,
      image: "https://placehold.co/600x400",
    },
  ];

  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("check if ViewHome componenet is loaded", () => {
    axios.get
      .mockResolvedValueOnce({ data: { preferences: mockPreferences } })
      .mockResolvedValueOnce({
        data: { servicesProvider: mockServiceProviders },
      });
    const component = render(<ViewHome />);

    expect(component).toBeTruthy();
  });
});
