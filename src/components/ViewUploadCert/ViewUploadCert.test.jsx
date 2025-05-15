import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import UploadCert from "./ViewUploadCert";

describe("UploadCert", () => {
  beforeEach(() => {
    global.URL.createObjectURL = vi.fn(() => "mock-url");
  });

  it("renders Upload Certificate feature", () => {
    render(<UploadCert />);
    expect(screen.getByText(/Upload & Preview/i)).toBeTruthy();
  });

  it("accepts valid image file and shows preview", () => {
    render(<UploadCert />);

    const fileInput = screen.getByLabelText(/Choose File/i);

    const validFile = new File(["dummy content"], "image.png", {
      type: "image/png",
    });

    Object.defineProperty(fileInput, "files", {
      value: [validFile],
    });

    fireEvent.change(fileInput);

    expect(screen.getByText(/image.png/i)).toBeTruthy();
    expect(screen.getByAltText("Preview")).toBeInTheDocument();
    expect(URL.createObjectURL).toHaveBeenCalledWith(validFile);
  });
});
