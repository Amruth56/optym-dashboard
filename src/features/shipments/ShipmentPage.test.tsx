import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ShipmentsPage from "./shipmentsPage";

const pushMock = vi.fn();
const getMock = vi.fn();
const keysMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: getMock,
    keys: keysMock,
  }),
}));

vi.mock("../../reusable/components/cards/CardsComponent", () => ({
  default: ({ number, description }: { number: string; description: string }) => (
    <div>
      <span>{number}</span>
      <span>{description}</span>
    </div>
  ),
}));

vi.mock("./component/table/TableComponent", () => ({
  default: ({ onProSelected }: { onProSelected: (pro: string) => void }) => (
    <button onClick={() => onProSelected("10837094940")}>Select PRO</button>
  ),
}));

vi.mock("./component/tabs/TabsComponent", () => ({
  default: ({ selectedProNumber }: { selectedProNumber: string }) => (
    <div>Tabs for {selectedProNumber}</div>
  ),
}));

describe("ShipmentsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getMock.mockReturnValue(null);
    keysMock.mockReturnValue([]);
  });

  it("renders shipment cards", () => {
    render(<ShipmentsPage />);

    expect(screen.getByText("5.3")).toBeInTheDocument();
    expect(screen.getByText("Overall Bills /Hr")).toBeInTheDocument();
    expect(screen.getByText("Load Average: Loading and Closed")).toBeInTheDocument();
    expect(screen.getByText("Closed Load Average")).toBeInTheDocument();
    expect(screen.getByText("# Dockers Working")).toBeInTheDocument();
    expect(screen.getByText("Dockers Unassigned")).toBeInTheDocument();
  });

  it("does not show tabs initially", () => {
    render(<ShipmentsPage />);

    expect(screen.queryByText(/Tabs for/i)).not.toBeInTheDocument();
  });

  it("shows tabs when pro is present in search params", () => {
    getMock.mockImplementation((key: string) =>
      key === "pro" ? "10837094940" : null
    );

    render(<ShipmentsPage />);

    expect(screen.getByText("Tabs for 10837094940")).toBeInTheDocument();
  });

  it("updates url when pro is selected", () => {
    render(<ShipmentsPage />);

    fireEvent.click(screen.getByText("Select PRO"));

    expect(pushMock).toHaveBeenCalledWith("/shipments?pro=10837094940");
  });

  it("clears url when same pro is selected again", () => {
    getMock.mockImplementation((key: string) =>
      key === "pro" ? "10837094940" : null
    );

    render(<ShipmentsPage />);

    fireEvent.click(screen.getByText("Select PRO"));

    expect(pushMock).toHaveBeenCalledWith("/shipments");
  });
});