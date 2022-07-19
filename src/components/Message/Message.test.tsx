import { render, screen } from '@testing-library/react';
import { Message } from '.';

describe('<Message />', () => {
    it('should render the message passed to it through props', () => {
        const message = 'Hello World';
        render(<Message message={message} />);
        expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
    })
})