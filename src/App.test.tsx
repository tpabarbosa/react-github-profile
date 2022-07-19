import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { GithubProvider } from './contexts/Github';
import { server } from './__tests__/mocks/server'
import { getByDataIcon } from './__tests__/utils/queriesByDataIcon';


describe('app is loaded', ()=> {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('renders in dark mode, with a header that contais the app title and the search box, and with a main section that has a instruction message', () => {
    const {container} = render(
      <GithubProvider>
        <App />
      </GithubProvider>
    );

    expect(getByDataIcon(container, 'moon')).toBeInTheDocument();
    expect(screen.getByText(/Github Profile Viewer/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText(/Type a username into the search box to get started/i)).toBeInTheDocument();
  });

  describe('user clicks in toggler theme button', ()=> {
    it('changes theme to light mode', async () => {
      const {container} = render(
        <GithubProvider>
          <App />
        </GithubProvider>
      );

      const button = screen.getAllByRole('button')[0];
      expect(button).toBeInTheDocument();
      fireEvent.click(button);

      await waitFor(() => {
        expect(getByDataIcon(container, 'sun')).toBeInTheDocument();
      })
    })
  })

  describe('user searches for a existent username', ()=> {

    beforeEach(() => {
      render(
        <GithubProvider>
          <App />
        </GithubProvider>
      );

    })

    const getUser = async () => {
      const inputElement = screen.getByRole('textbox');

      const buttonElement = screen.getByText(/^Search$/i);
      fireEvent.change(inputElement, {target: {value: 'testuser'}})
      fireEvent.click(buttonElement)
      
      await waitFor(() => {
        expect(screen.getByText(/loading/i)).toBeInTheDocument()
      })

      await waitFor(() => {
        expect(screen.getByText(/@testuser/i)).toBeInTheDocument();
      })
    }    

    it('renders the user profile with username, the user status with the created date, buttons respositories and starred, and a list of repositories cards', async () => {

      await getUser();
      expect(screen.getByText(/is a Github/i)).toBeInTheDocument();
      expect(screen.getByText(/Repositories/i)).toBeInTheDocument();
      expect(screen.getByText(/Starred/i) as HTMLButtonElement).toBeInTheDocument();
      expect(screen.getByText('repository-name')).toBeInTheDocument();
      expect(screen.getByText('repository-name2')).toBeInTheDocument();

    });

    describe('user clicks in starred button', ()=> {
      it('changes the tab to starred and renders a list of starred repositories cards', async () => {

        await getUser()

        const starredButton = screen.getByText(/Starred/i)
        fireEvent.click(starredButton)

        await waitFor(() => {
          expect(starredButton).toBeDisabled();
        })
        expect(screen.getAllByRole('img')).toHaveLength(3);
      })

      describe('user clicks in repositories button', ()=> {
        it('changes the tab to repositories and renders a list of repositories cards', async () => {
          await getUser()
        
          const starredButton = screen.getByText(/Starred/i)
          fireEvent.click(starredButton)

          await waitFor(() => {
            expect(starredButton).toBeDisabled();
          })

          const repositoriesButton = screen.getByText(/Repositories/i)
          fireEvent.click(repositoriesButton)

          await waitFor(() => {
            expect(repositoriesButton).toBeDisabled();
          })
          expect(screen.getAllByRole('img')).toHaveLength(1);
        })
      })
    })
  
  })

  describe('user searches for an inexistent username', ()=> {
    it('renders a not found user message', async () => {
      render(
        <GithubProvider>
          <App />
        </GithubProvider>
      );

      const inputElement = screen.getByRole('textbox');

      const buttonElement = screen.getByText(/^Search$/i);
      fireEvent.change(inputElement, {target: {value: 'inexistentuser'}})
      fireEvent.click(buttonElement)
      
      await waitFor(() => {
        expect(screen.getByText(/Username "inexistentuser" not found/i)).toBeInTheDocument()
      })

    });
  })

  describe('user searches for a username and server responds with an error distinct of 404',  ()=> {
    it('renders a generic error message', async () => {
      render(
        <GithubProvider>
          <App />
        </GithubProvider>
      );

      const inputElement = screen.getByRole('textbox');

      const buttonElement = screen.getByText(/^Search$/i);
      fireEvent.change(inputElement, {target: {value: 'mockservererror'}})
      fireEvent.click(buttonElement)
      
      await waitFor(() => {
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
      })
    });
  })

})


