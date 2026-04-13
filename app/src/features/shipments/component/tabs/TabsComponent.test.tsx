import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import TabsComponent from "./TabsComponent";

const renderComponent = (selectedProNumber = "10880266600") => {
  render(<TabsComponent selectedProNumber={selectedProNumber} />);
};

describe("Tabs Component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("renders the Pro Number and Task Status", () => {
    expect(screen.getByText(/PRO 10880266600/i)).toBeInTheDocument();
    expect(screen.getByText(/Unloading/i)).toBeInTheDocument();
  });

  it("renders selected Pro Number data", () => {
    expect(screen.getByText(/Current Assignment/i)).toBeInTheDocument();
    expect(screen.getByText(/Load to Trailer/i)).toBeInTheDocument();
    expect(screen.getAllByText(/T-287215/i).length).toBeGreaterThan(0);

    expect(screen.getByText(/4 mins remaining/i)).toBeInTheDocument();
    expect(screen.getByText(/CHANGE/i)).toBeInTheDocument();

    expect(screen.getByText(/Bay 59/i)).toBeInTheDocument();
    expect(screen.getByText(/Door 47/i)).toBeInTheDocument();
    expect(screen.getByText(/Richard G/i)).toBeInTheDocument();
  });
});