import {render, screen} from '@testing-library/react';
import Page from './page';

describe("Home Page", () => {
    it("renderes the home page", () => {
        render(<Page/>);

        expect(screen.getByText("Hiii")).toBeInTheDocument();
    })
} )