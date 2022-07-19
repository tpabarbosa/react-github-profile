import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBox } from './';
import mockedUseGithub, {MockedUseGithubType} from '../../__tests__/mocks/mockUseGithub';
import { getByDataIcon } from '../../__tests__/utils/queriesByDataIcon';

jest.mock('../../contexts/Github');

describe('<SearchBox />', () => {
    
    it('should render an image, an inputbox and a button', () => {
        
        mockedUseGithub(MockedUseGithubType.EMPTY)
        const {container} = render(<SearchBox />);
        
        const icon = getByDataIcon(container, 'search');
        const input = screen.getByRole('textbox');
        const button = screen.getByText(/Search/i);
        expect(icon).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
        expect(input).toHaveValue('');
    })

    it('should enable button when input value is not empty', () => {
        mockedUseGithub(MockedUseGithubType.EMPTY)
        render(<SearchBox />)

        const input = screen.getByRole('textbox');
        const button = screen.getByText(/Search/i);

        fireEvent.change(input, {target: {value: 'test'}});
        expect(button).not.toBeDisabled();
        expect(input).toHaveValue('test');
    })

    it('should call getUser method, clear input and disable button when button is clicked', async () => {
        const mockUseGithub = mockedUseGithub(MockedUseGithubType.EMPTY)
        render(<SearchBox />)

        const input = screen.getByRole('textbox');
        const button = screen.getByText(/Search/i);

        fireEvent.change(input, {target: {value: 'test'}});
        fireEvent.click(button);

        const getUserFn = mockUseGithub.mock.results[1].value.getUser
        
        expect(getUserFn).toHaveBeenCalledWith('test');
        expect(getUserFn).toBeCalledTimes(1)
        expect(button).toBeDisabled();
        expect(input).toHaveValue('');
    })
})