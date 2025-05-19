import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as router from "react-router-dom";
import axios from "axios";
import ViewBookingSummary from "./ViewBookingSummary";
import { vi } from "vitest";

// Mock react-router-dom hooks
vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(),
  useNavigate: vi.fn(),
}));

// Mock jsPDF
const saveMock = vi.fn();
vi.mock("jspdf", () => ({
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
}));

// Mock axios
vi.mock("axios");

// Enhanced ViewMakePayment mock
vi.mock("../ViewMakePayment/ViewMakePayment", () => ({
  default: vi.fn(({ 
    canProceed,
    paymentErrors,
    apiMessage,
    isApiError 
  }) => (
    <form data-testid="payment-form">
      {!canProceed && <div>No services or date selected</div>}
      
      {/* Payment error messages */}
      {paymentErrors.cardName && <div>{paymentErrors.cardName}</div>}
      {paymentErrors.cardNumber && <div>{paymentErrors.cardNumber}</div>}
      {paymentErrors.expiryDate && <div>{paymentErrors.expiryDate}</div>}
      {paymentErrors.cvv && <div>{paymentErrors.cvv}</div>}
      
      {/* API response message */}
      {apiMessage && (
        <div className={isApiError ? "text-red-500" : "text-green-500"}>
          {apiMessage}
        </div>
      )}
      
      <button type="submit">Submit Payment</button>
    </form>
  )),
}));

describe("ViewBookingSummary Component", () => {
  const mockNavigate = vi.fn();
  const mockServices = [
    { service_id: 1, price: "50.00", duration: "60 mins", by_user_id: 10 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    router.useNavigate.mockReturnValue(mockNavigate);
  });

  const setup = (stateOverrides = {}) => {
    router.useLocation.mockReturnValue({
      state: {
        selectedServices: [1],
        selectedServicestag: [["Bathroom Cleaning"]],
        selectedDate: "2025-05-20T14:00:00Z",
        services: mockServices,
        ...stateOverrides,
      },
    });
    return render(<ViewBookingSummary />);
  };

  it("renders selected services and date", () => {
    setup();
    expect(screen.getByText(/Bathroom Cleaning/)).toBeInTheDocument();
    expect(screen.getByText(/May 20/)).toBeInTheDocument();
  });

  it("shows empty state when no services or date selected", () => {
    setup({
      selectedServices: [],
      selectedServicestag: [],
      selectedDate: null,
      services: [],
    });
    
    expect(screen.getByText(/No services selected/)).toBeInTheDocument();
    expect(screen.getByText(/Not Set/)).toHaveClass("text-red-500");
  });

  it("calls jsPDF save on download button click", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: /download/i }));
    expect(saveMock).toHaveBeenCalled();
  });

  it("navigates back when back button is clicked", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("passes correct props to ViewMakePayment", () => {
    setup();
    expect(screen.getByTestId("payment-form")).toBeInTheDocument();
    expect(screen.queryByText(/No services or date selected/)).not.toBeInTheDocument();
  });
});