import {render, screen} from '@testing-library/react';
import Navbar from './Navbar';


const navItems = [
    "HOME",
    "DOORS/BAYS",
    "BAYS",
    "TRAILERS",
    "LOADS",
    "SHIPMENTS",
    "WORKERS",
    "JOCKEYS",
    "YARD",
    "SETTINGS",
];

describe("Navbar", () => {
    it("renders all nav items", () => {
        render(<Navbar/>);

        navItems.forEach((item, index) => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });
});