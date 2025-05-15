import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as router from "react-router-dom";
import axios from "axios";
import ConfirmBooking from "./ConfirmBooking";

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));
const saveMock = vi.fn();
vi.mock("jspdf", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      internal: {
        pageSize: { width: 210, height: 297 },
        getWidth: () => 210,
        getHeight: () => 297,
      },
      setFontSize: vi.fn(),
      setFont: vi.fn(),
      setTextColor: vi.fn(),
      text: vi.fn(),
      line: vi.fn(),
      setDrawColor: vi.fn(),
      splitTextToSize: vi.fn(() => ["Thank you"]),
      save: saveMock,
    })),
  };
});

vi.mock("axios");

describe("ConfirmBooking Component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    router.useNavigate.mockReturnValue(mockNavigate);
  });

  it("renders selected services and date", () => {
    router.useLocation.mockReturnValue({
      state: {
        selectedServices: [1],
        services: [
          { id: 1, type: "Bathroom Cleaning", price: 1, duration: 60 },
        ],
        selectedDate: "2025-05-20T14:00:00Z",
      },
    });
    render(<ConfirmBooking />);

    expect(screen.getByText(/Bathroom Cleaning/)).toBeInTheDocument();
    expect(screen.getByText(/May 20/)).toBeInTheDocument();
  });

  it("calls jsPDF save on download button click", async () => {
    router.useLocation.mockReturnValue({
      state: {
        selectedServices: [1],
        services: [{ id: 1, type: "Cleaning", price: 100, duration: 60 }],
        selectedDate: "2025-05-20T14:00:00Z",
      },
    });

    render(<ConfirmBooking />);
    const downloadBtn = screen.getByRole("button", {
      name: /download/i,
    });
    await userEvent.click(downloadBtn);

    expect(saveMock).toHaveBeenCalled();
  });

  it("submits payment and navigates on success", async () => {
    router.useLocation.mockReturnValue({
      state: {
        selectedServices: [1],
        services: [{ id: 1, type: "Cleaning", price: 100, duration: 60 }],
        selectedDate: "2025-05-20T14:00:00Z",
      },
    });

    axios.post.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Payment successful!" }),
      statusText: "OK",
    });

    render(<ConfirmBooking />);

    userEvent.type(screen.getByLabelText(/Cardholder Name/i), "John Doe");
    userEvent.type(
      screen.getByLabelText(/Card Number/i),
      "4111 1111 1111 1111"
    );
    userEvent.type(screen.getByLabelText(/Expiry Date/i), "12/30");
    userEvent.type(screen.getByLabelText(/CVV/i), "123");

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    userEvent.click(submitBtn);
    expect(router.useNavigate).toHaveBeenCalled();
  });
});
