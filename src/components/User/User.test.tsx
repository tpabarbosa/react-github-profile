import { render, screen } from '@testing-library/react';
import { User } from '.';
import mockedUseGithub, { completeUser, incompleteUser, MockedUseGithubType } from '../../__tests__/mocks/mockUseGithub';

jest.mock('../../contexts/Github');

describe('<User />', () => {

    it('should not render elements if user is empty', () => {
        mockedUseGithub(MockedUseGithubType.EMPTY)
        render(<User />)

        const img = screen.queryByRole('img');

        expect(img).not.toBeInTheDocument()
    })

    it('should render elements correctly if user was found', () => {
        mockedUseGithub(MockedUseGithubType.SUCCESS_COMPLETE_DATA)
        render(<User />)

        const img = screen.getByRole('img');

        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', completeUser.avatar_url)

        expect(screen.getByText(completeUser.name)).toBeInTheDocument()
        expect(screen.getByText(`@${completeUser.login}`)).toBeInTheDocument()
        expect(screen.getByText(completeUser.bio)).toBeInTheDocument()
        expect(screen.getByText(completeUser.email)).toBeInTheDocument()
        expect(screen.getByText(completeUser.company)).toBeInTheDocument()
        expect(screen.getByText(completeUser.location)).toBeInTheDocument()

        const blog = screen.getByRole('link');
        expect(blog).toHaveAttribute('href', completeUser.blog)
    })

    it('should not render elements with empty values', () => {
        mockedUseGithub(MockedUseGithubType.SUCCESS_INCOMPLETE_DATA)
        render(<User />)

        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', incompleteUser.avatar_url)
        expect(screen.getByText(`@${completeUser.login}`)).toBeInTheDocument()
        
        expect(screen.queryByText(completeUser.name)).not.toBeInTheDocument()
        expect(screen.queryByText(completeUser.bio)).not.toBeInTheDocument()
        expect(screen.queryByText(completeUser.email)).not.toBeInTheDocument()
        expect(screen.queryByText(completeUser.company)).not.toBeInTheDocument()
        expect(screen.queryByText(completeUser.location)).not.toBeInTheDocument()
        expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
})