import { render, screen } from '@testing-library/react';
import { UserStatus } from '.';
import mockedUseGithub, { completeUser, MockedUseGithubType } from '../../__tests__/mocks/mockUseGithub';

jest.mock('../../contexts/Github');

describe('<UserStatus />', () => {

    it('should not render elements if user is empty', () => {
        mockedUseGithub(MockedUseGithubType.EMPTY)
        render(<UserStatus />)

        const name = screen.queryByText(/is a Github/i);

        expect(name).not.toBeInTheDocument()
    })

    it('should render elements correctly if user was found', () => {
        mockedUseGithub(MockedUseGithubType.SUCCESS_COMPLETE_DATA)
        render(<UserStatus />)

        expect(screen.getByLabelText(/followers/i)).toHaveTextContent(completeUser.followers.toString())

        expect(screen.getByLabelText(/following/i)).toHaveTextContent(completeUser.following.toString())

        expect(screen.getByLabelText(/repositories/i)).toHaveTextContent(completeUser.public_repos.toString())

        expect(screen.getByLabelText(/gists/i)).toHaveTextContent(completeUser.public_gists.toString())

        expect(screen.getByText(/is a Github/i)).toBeInTheDocument()
        expect(screen.getByText(/January 1, 2020/i)).toBeInTheDocument();
        
    })

    it('should not render follower, following and gists with empty values', () => {
        mockedUseGithub(MockedUseGithubType.SUCCESS_INCOMPLETE_DATA)
        render(<UserStatus />)

        expect(screen.queryByLabelText(/followers/i)).not.toBeInTheDocument()

        expect(screen.queryByLabelText(/following/i)).not.toBeInTheDocument()

        expect(screen.queryByLabelText(/gists/i)).not.toBeInTheDocument()
        
    })
})