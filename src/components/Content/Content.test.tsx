import { render, screen } from '@testing-library/react';
import { Content } from '.';
import mockedUseGithub, { MockedUseGithubType } from '../../__tests__/mocks/mockUseGithub';

jest.mock('../../contexts/Github');

describe('<Content />', () => {

    it('should render an instructional message', () => {
        mockedUseGithub(MockedUseGithubType.EMPTY)
        render(<Content />)
        const text = screen.getByText(/Type a username into the search box to get started/i)
        expect(text).toBeInTheDocument();
    })

    it('should render an error message', () => {
        mockedUseGithub(MockedUseGithubType.ERROR)
        render(<Content />)
        const text = screen.getByText(/Error Message/i)
        expect(text).toBeInTheDocument();
    })

    it('should render a loading message', () => {
        mockedUseGithub(MockedUseGithubType.LOADING)
        render(<Content />)
        const text = screen.getByText(/Loading... please wait/i)
        expect(text).toBeInTheDocument();
    })

    it('should render user profile', async () => {
        mockedUseGithub(MockedUseGithubType.SUCCESS_COMPLETE_DATA)
        render(<Content />)
        const img = await screen.findByRole('img')
        expect(img).toBeInTheDocument();
    })
})