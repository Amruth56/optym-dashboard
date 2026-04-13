import {render, screen, fireEvent} from "@testing-library/react";
import ShipmentDetailsPanel from "./ShipmentDetailsPanel";
import shipmentDetail from "../../JsonData/ShipmentDetail.json";

const renderComponent = (shipment=shipmentDetail) => {
    render(<ShipmentDetailsPanel shipment={shipment} />);
};

describe("ShipmentDetailsPanel", () => {
    it("renders shipment information", () => {
        renderComponent();

        expect(screen.getByText("Pickup Date")).toBeInTheDocument();
        expect(screen.getByText("03/04/2026")).toBeInTheDocument();

        expect(screen.getByText("Pro Number")).toBeInTheDocument();
        expect(screen.getByText("10837094940")).toBeInTheDocument();

        expect(screen.getByText("Due Date")).toBeInTheDocument();
        expect(screen.getByText("03/05/2026")).toBeInTheDocument();
    });

    it("renders terminal details", () => {
        renderComponent();

        expect(screen.getByText("Current terminal")).toBeInTheDocument();
        expect(screen.getAllByText("FTW")).toHaveLength(2); 

        expect(screen.getByText("Next terminal")).toBeInTheDocument();
        expect(screen.getAllByText("--").length).toBeGreaterThan(0);;

        expect(screen.getByText("Shipment Status")).toBeInTheDocument();
        expect(screen.getByText("ORIGIN DOCK")).toBeInTheDocument();

        expect(screen.getByText("Location")).toBeInTheDocument();
        expect(screen.getByText("P&D")).toBeInTheDocument();
    });

    it("renders shipper details", () => {
        renderComponent();

        expect(screen.getByText("Shipper")).toBeInTheDocument();
        expect(screen.getByText("CARDINAL HEALTH AT HOME SOLUTI")).toBeInTheDocument();

        expect(screen.getByText("Shipper Address")).toBeInTheDocument();
        expect(screen.getByText("3000 MARK IV PKWY, FORT WORTH, TX 76106")).toBeInTheDocument();

        expect(screen.getByText("Order #")).toBeInTheDocument();
        expect(screen.getAllByText("--").length).toBeGreaterThan(0);

    });

    it("renders consignee details", () => {
            renderComponent();

            expect(screen.getByText("Consignee")).toBeInTheDocument();
            expect(screen.getByText("RESPMED")).toBeInTheDocument();
            
            expect(screen.getByText("Consignee Address")).toBeInTheDocument();
            expect(screen.getByText(", EL PASO, TX 79925")).toBeInTheDocument();    

            expect(screen.getByText("Customer #")).toBeInTheDocument();
            expect(screen.getByText("9900029")).toBeInTheDocument();
            
    });


  it("renders shipment line item table headers", () => {
    renderComponent();

    expect(screen.getByText("PC")).toBeInTheDocument();
    expect(screen.getByText("HM")).toBeInTheDocument();
    expect(screen.getByText("PKG")).toBeInTheDocument();
    expect(screen.getByText("DESCRIPTION")).toBeInTheDocument();
    expect(screen.getByText("CLASS")).toBeInTheDocument();
    expect(screen.getByText("WEIGHT")).toBeInTheDocument();
    expect(screen.getByText("RATE")).toBeInTheDocument();
  });

  it("renders bottom section shipment metadata with fallbacks", () => {
    renderComponent();

    expect(screen.getByText("Original Terminal")).toBeInTheDocument();
    expect(screen.getAllByText("FTW")).toHaveLength(2); 

    expect(screen.getByText("Destination Terminal")).toBeInTheDocument();
    expect(screen.getByText("ELP")).toBeInTheDocument();

    expect(screen.getByText("Trailer")).toBeInTheDocument();
    expect(screen.getAllByText("--").length).toBeGreaterThan(0);

    expect(screen.getByText("BOL #")).toBeInTheDocument();
    expect(screen.getAllByText("--").length).toBeGreaterThan(0);

    expect(screen.getByText("Terms")).toBeInTheDocument();
    expect(screen.getAllByText("--").length).toBeGreaterThan(0);
  });

  it("renders load and routing information with fallbacks", () => {
    renderComponent();

    expect(screen.getByText("LH Load To and Type/Door")).toBeInTheDocument();
    expect(screen.getByText("-- / --")).toBeInTheDocument();

    expect(screen.getByText("Route/Door")).toBeInTheDocument();
    expect(screen.getAllByText("--").length).toBeGreaterThan(0);

    expect(screen.getByText("Stop Seq")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("Loading Zone")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
  });
})