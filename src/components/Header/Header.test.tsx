import { render, screen } from '@testing-library/react';
import { Header } from '.';
import { getByDataIcon } from '../../__tests__/utils/queriesByDataIcon';
import { SearchBox } from '../SearchBox';
import { ThemeToggler } from '../ThemeToggler';

jest.mock('../ThemeToggler');
jest.mock('../SearchBox');
const mockedThemeButton = ThemeToggler as jest.MockedFunction<typeof ThemeToggler>
const mockedSearchBox = SearchBox as jest.MockedFunction<typeof SearchBox>

describe('<Header />' , () => {

    it('should render a github logo, a title, a theme toggler and a search box', () => {
        mockedThemeButton.mockImplementation(() => <div>Toggler</div>);
        mockedSearchBox.mockImplementation(() => <div>SearchBox</div>);

        const {container} = render(<Header />)

        const logo = getByDataIcon(container, 'github');
        const title = screen.getByText(/Github Profile Viewer/i);
        const toggler = screen.getByText(/Toggler/i);
        const searchBox = screen.getByText(/SearchBox/i);

        expect(logo).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(toggler).toBeInTheDocument();
        expect(searchBox).toBeInTheDocument();
    })
})