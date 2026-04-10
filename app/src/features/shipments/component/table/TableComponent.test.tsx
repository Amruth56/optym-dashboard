import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableComponent from "./TableComponent";

const setGridOptionMock = vi.fn();
const exportDataAsCsvMock = vi.fn();

vi.mock("ag-grid-react", async () => {
  const React = await import("react");

  const AgGridReact = React.forwardRef((props: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      api: {
        setGridOption: setGridOptionMock,
        exportDataAsCsv: exportDataAsCsvMock,
      },
    }));

    return (
      <div>
        <button
          onClick={() =>
            props.onRowClicked?.({ data: { proNumber: "10837094940" } })
          }
        >
          Mock Row
        </button>
      </div>
    );
  });

  return {
    AgGridProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    AgGridReact,
  };
});

vi.mock("lucide-react", () => ({
  DownloadIcon: () => <svg data-testid="download-icon" />,
}));

describe("TableComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.dataset.agThemeMode = "";
  });

  it("renders heading, search input and export button", () => {
    render(<TableComponent onProSelected={vi.fn()} />);

    expect(screen.getByText("2500 Shipments")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByRole("button", {name:"Export CSV"})).toBeInTheDocument();
  });

  it("sets ag theme mode to dark on mount", () => {
    render(<TableComponent onProSelected={vi.fn()} />);
    expect(document.body.dataset.agThemeMode).toBe("dark");
  });

  it("calls setGridOption when user types in search box", () => {
    render(<TableComponent onProSelected={vi.fn()} />);

    const input = screen.getByPlaceholderText("Search");
    fireEvent.input(input, { target: { value: "Dallas" } });

    expect(setGridOptionMock).toHaveBeenCalledWith("quickFilterText", "Dallas");
  });

  it("calls exportDataAsCsv when export button is clicked", () => {
    render(<TableComponent onProSelected={vi.fn()} />);

    const button = screen.getByRole("button", {name: "Export CSV"});
    fireEvent.click(button);

    expect(exportDataAsCsvMock).toHaveBeenCalledWith({
      fileName: "shipment_list.csv",
    });
  });

  it("calls onProSelected when a row is clicked", () => {
    const onProSelectedMock = vi.fn();

    render(<TableComponent onProSelected={onProSelectedMock} />);

    fireEvent.click(screen.getByText("Mock Row"));

    expect(onProSelectedMock).toHaveBeenCalledWith("10837094940");
  });
});