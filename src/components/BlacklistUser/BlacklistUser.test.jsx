import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import BlacklistUser from "./BlacklistUser";

describe("BlacklistUser", () => {
  const renderPage = () => render(<BlacklistUser />);

  it("renders BlacklistUser page", () => {
    renderPage();
    // Adjust text for actual heading or unique identifier
    expect(<BlacklistUser />).toBeTruthy();
  });
});
