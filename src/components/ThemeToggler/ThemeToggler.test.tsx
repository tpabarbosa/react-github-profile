
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeToggler } from ".";
import { ThemedApp } from "../../Theme";
import { getByDataIcon, queryByDataIcon } from "../../__tests__/utils/queriesByDataIcon";

describe('<ThemeToggler />', () => {

    it('should render default mode dark', () => {
        const {container} = render(
            <ThemedApp >
                <ThemeToggler />
            </ThemedApp>
        );
        
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(getByDataIcon(container, 'moon')).toBeInTheDocument();
    })

    it('should render correct light mode', () => {
        const {container} = render(
            <ThemedApp mode='light'>
                <ThemeToggler />
            </ThemedApp>
        );
        
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(getByDataIcon(container, 'sun')).toBeInTheDocument();
    })

    it('should toggle mode when button is clicked', async () => {
        const {container} = render(
            <ThemedApp mode='dark'>
                <ThemeToggler />
            </ThemedApp>
        );
        
        const button = screen.getByRole('button');

        fireEvent.click(button);
        await waitFor(() => {
            expect(queryByDataIcon(container, 'moon')).not.toBeInTheDocument();
        })
        
        expect(getByDataIcon(container, 'sun')).toBeInTheDocument();

        fireEvent.click(button);
        await waitFor(() => {
            expect(queryByDataIcon(container, 'sun')).not.toBeInTheDocument();
        })
        
        expect(getByDataIcon(container, 'moon')).toBeInTheDocument();
    })
})