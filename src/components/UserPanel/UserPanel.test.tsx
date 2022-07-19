import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import { UserPanel } from '.';
import mockedUseGithub, { MockedUseGithubType } from '../../__tests__/mocks/mockUseGithub';
import { RepositoryCard } from '../RepositoryCard';
import { successCompleteUser, successIncompleteUser } from '../../__tests__/mocks/mockUseGithub';
import { GithubRepository } from '../../contexts/Github';

jest.mock('../../contexts/Github');
jest.mock('../RepositoryCard');
const mockedCard = RepositoryCard as jest.MockedFunction<typeof RepositoryCard>


describe('<UserPanel />', () => {

    const checkRepositoryCardRendering = (mockedCard: jest.MockedFunction<typeof RepositoryCard>, type: 'repository' | 'starred', repos: GithubRepository[]) => {
        expect(mockedCard).toHaveBeenCalledTimes(repos.length);
        for (let i = 0; i < repos.length; i++) {
            expect(mockedCard.mock.calls[i][0]).toMatchObject({type, repo:repos[i] });
        }
        mockedCard.mockClear();
    }

    it('should render repositories button and starred button', () => {
        mockedUseGithub(MockedUseGithubType.SUCCESS_COMPLETE_DATA)
        mockedCard.mockImplementation(() => <div>RepositoryCard</div>);
        
        render(<UserPanel />)
        
        const repositoriesButton = screen.getByText(/Repositories/i)
        const starredButton = screen.getByText(/Starred/i)
        expect(repositoriesButton).toBeInTheDocument()
        expect(repositoriesButton).toBeDisabled()
        expect(starredButton).toBeInTheDocument()
        expect(starredButton).not.toBeDisabled()
        
    })

    it('should render repository tab and change tab accordingly to button click', async () => {
        mockedUseGithub(MockedUseGithubType.SUCCESS_COMPLETE_DATA)
        mockedCard.mockImplementation(() => <div>RepositoryCard</div>);
        
        render(<UserPanel />)

        const repositoriesButton = screen.getByText(/Repositories/i)
        const starredButton = screen.getByText(/Starred/i)

        checkRepositoryCardRendering(mockedCard, 'repository', successCompleteUser.repositories);

        fireEvent.click(starredButton);
        await waitFor(() => expect(repositoriesButton).not.toBeDisabled())
        await waitFor(() => expect(starredButton).toBeDisabled())

        checkRepositoryCardRendering(mockedCard, 'starred', successCompleteUser.starred);
        
        fireEvent.click(repositoriesButton);
        await waitFor(() => expect(repositoriesButton).toBeDisabled())
        await waitFor(() => expect(starredButton).not.toBeDisabled())
        checkRepositoryCardRendering(mockedCard, 'repository', successCompleteUser.repositories);
        
    })

    
    it('should not render tab cards if repositories or starred are empty', () => {
        mockedUseGithub(MockedUseGithubType.SUCCESS_INCOMPLETE_DATA)
        mockedCard.mockImplementation(() => <div>RepositoryCard</div>);

        checkRepositoryCardRendering(mockedCard, 'starred', successIncompleteUser.starred);
        checkRepositoryCardRendering(mockedCard, 'repository', successIncompleteUser.repositories);
    })
})