import { render, screen } from '@testing-library/react';
import { RepositoryCard } from '.';
import { getByDataIcon } from '../../__tests__/utils/queriesByDataIcon';

import {repos} from '../../__tests__/mocks/mockUseGithub';

const repo = repos[0];

describe('<RepositoryCard />', () => {

    it('should render elements correctly', () => {
        const {container} = render(<RepositoryCard type='repository' repo={repo}/>)

        expect(screen.getByText(repo.name)).toBeInTheDocument()
        
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', repo.html_url)
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noreferrer')

        expect(screen.getByText(repo.description)).toBeInTheDocument()
        expect(screen.getByText(repo.language)).toBeInTheDocument()
        expect(screen.getByText(/February 1, 2020/i)).toBeInTheDocument();
        
        expect(getByDataIcon(container, 'star')).toBeInTheDocument();
        expect(screen.getByLabelText(/stars/i)).toHaveTextContent(repo.stargazers_count.toString())

        expect(getByDataIcon(container, 'eye')).toBeInTheDocument();
        expect(screen.getByLabelText(/watchers/i)).toHaveTextContent(repo.watchers_count.toString())
        
        expect(getByDataIcon(container, 'fork')).toBeInTheDocument();
        expect(screen.getByLabelText(/forks/i)).toHaveTextContent(repo.forks_count.toString())

        expect(getByDataIcon(container, 'issues')).toBeInTheDocument();
        expect(screen.getByLabelText(/open issues/i)).toHaveTextContent(repo.open_issues_count.toString())
    })

    it('should render own repository without owner image and name', () => {
        render(<RepositoryCard type='repository' repo={repo}/>)

        const img = screen.queryByRole('img')
        expect(img).not.toBeInTheDocument();
        expect(screen.queryByText(`@${repo.owner.login}`)).not.toBeInTheDocument()
    })

    it('should render starred repository with owner image and name', () => {
        render(<RepositoryCard type='starred' repo={repo}/>)

        const img = screen.getByRole('img')
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', repo.owner.avatar_url)
        expect(screen.getByText(`@${repo.owner.login}`)).toBeInTheDocument()
    })
})