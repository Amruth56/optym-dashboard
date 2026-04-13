import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("renders add assignment ", () => {
    expect(screen.getByText("+ Add assignment")).toBeInTheDocument();
  })

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

  it("renders all the tab triggers", () => {
    expect(screen.getByText("SHIPMENT DETAILS")).toBeInTheDocument();
    expect(screen.getByText("PHOTOS")).toBeInTheDocument();
    expect(screen.getByText("ACTIVITY")).toBeInTheDocument();
  });

  it("render shipment details tab as the default active tab", () => {
    expect(screen.getByText(/Current Assignment/i)).toBeInTheDocument();
  });

  it("Switch betweeen the tabs", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("tab", { name: /PHOTOS/i }));
    expect(screen.getByText(/Photos content goes here/i)).toBeInTheDocument();
  });



});
