import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Navbar from "./Navbar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/shipments",
}));

const navItems = [
  "Home",
  "Doors",
  "Bays",
  "Trailers",
  "Loads",
  "Shipments",
  "Workers",
  "Jockeys",
  "Yard",
  "Settings",
];

describe("Navbar", () => {
  it("renders all nav items", () => {
    render(<Navbar />);

    navItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});