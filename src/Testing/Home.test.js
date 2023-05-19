import { render, screen,cleanup } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import HomePage from "../Pages/Home"


describe("Home Component", () => {
    afterEach(cleanup)
    test('render WelCome To Expense Tracker as a text', () => {
        render(
            <MemoryRouter initialEntries={["/"]} exact>
                <HomePage />
            </MemoryRouter>
        );
        const HeadElement = screen.getByText('WelCome To Expense Tracker')
        expect(HeadElement).toBeInTheDocument()
    })

    test('render Your Profile is Incomplet as a text', () => {
        render(
            <MemoryRouter initialEntries={["/"]} exact>
                <HomePage />
            </MemoryRouter>
        );
        const paraElement = screen.getByText('Your Profile is Incomplete')
        expect(paraElement).toBeInTheDocument()
    })
})

