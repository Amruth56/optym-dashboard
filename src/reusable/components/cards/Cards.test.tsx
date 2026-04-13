import {render, screen} from '@testing-library/react';
import CardsComponent from './CardsComponent';

describe("Cards Component", () => {
    it("renders card component with number and description", () => {
        render(<CardsComponent number="10" description="Test Description"/>);

        expect(screen.getByText("10")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
    })
} )