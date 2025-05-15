import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ViewBlacklistUser from "./ViewBlacklistUser";

describe("ViewBlacklistUser", () => {
  const renderPage = () => render(<ViewBlacklistUser />);

  it("renders ViewBlacklistUser page", () => {
    renderPage();
    // Adjust text for actual heading or unique identifier
    expect(<ViewBlacklistUser />).toBeTruthy();
  });
});
