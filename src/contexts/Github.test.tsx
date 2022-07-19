import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { server } from '../__tests__/mocks/server';
import  useGithub, { GithubProvider }  from '../contexts/Github';

describe('<Github />', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    const Test = ({user, caller}: {user:string, caller:string}) => {
        const github = useGithub(caller)

        const handleClick = async () => {
            await github.getUser(user)
        }

        return (
            <>
                <div>{github.state}</div>
                <div>{github.stateMsg}</div>
                <div>User: {github.user?.login}</div>
                <div>Repos: {github.repositories.length}</div>
                <div>Starred: {github.starred.length}</div>
                <button onClick={handleClick}>Test Button</button>
            </>
        )
    }

    it('should work correctly when useGithub is called by a component that is a child of GithubProvider', async () => {
        render(
            <GithubProvider>
                <Test user='testuser' caller='test 1'/>
            </GithubProvider>
        )
        
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(screen.getByText(/empty/i)).toBeInTheDocument()

        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText(/loading/i)).toBeInTheDocument()
        })

        await waitFor(() => {
            expect(screen.getByText(/success/i)).toBeInTheDocument()
        })

        expect(screen.getByText(/User/i)).toHaveTextContent('User: testuser')
        expect(screen.getByText(/Repos/i)).toHaveTextContent('Repos: 2')
        expect(screen.getByText(/Starred/i)).toHaveTextContent('Starred: 2')
    })

    it('should work correctly when an inexistent user is called', async () => {
        render(
            <GithubProvider>
                <Test user='inexistentuser'  caller='test 2'/>
            </GithubProvider>
        )

        const button = screen.getByRole('button');
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument()
        })

        expect(screen.getByText(/not found/i)).toBeInTheDocument()
        expect(screen.getByText(/User:/i)).toHaveTextContent('User:')
        expect(screen.getByText(/Repos/i)).toHaveTextContent('Repos: 0')
        expect(screen.getByText(/Starred/i)).toHaveTextContent('Starred: 0')
    })

    it('should work correctly when an error is returned from repositories request or from starred request', async () => {
        render(
            <GithubProvider>
                <Test user='testusererror'  caller='test 3'/>
            </GithubProvider>
        )

        const button = screen.getByRole('button');
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText(/success/i)).toBeInTheDocument()
        })

        expect(screen.getByText(/User/i)).toHaveTextContent('User: testuser')
        expect(screen.getByText(/Repos/i)).toHaveTextContent('Repos: 0')
        expect(screen.getByText(/Starred/i)).toHaveTextContent('Starred: 0')
    })

    it('should work correctly when an error is returned from username request', async () => {
        render(
            <GithubProvider>
                <Test user='mockservererror'  caller='test 4'/>
            </GithubProvider>
        )

        const button = screen.getByRole('button');
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument()
        })

        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
        expect(screen.getByText(/User:/i)).toHaveTextContent('User:')
        expect(screen.getByText(/Repos/i)).toHaveTextContent('Repos: 0')
        expect(screen.getByText(/Starred/i)).toHaveTextContent('Starred: 0')
    })

    it('should not request the user that is the current user', async () => {
        render(
            <GithubProvider>
                <Test user='testuser'  caller='test 5'/>
            </GithubProvider>
        )

        const button = screen.getByRole('button');
        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText(/success/i)).toBeInTheDocument()
        })

        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })
    })

    it('should throw an error when useGithub is called by a component that is not child of GithubProvider', () => {
        const consoleErrorFn =jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

        expect(() => render(<Test user='testuser' caller='test 6'/>)).toThrow(/useGithub must be used within a GithubProvider/i)
        
        consoleErrorFn.mockRestore()
    })

})