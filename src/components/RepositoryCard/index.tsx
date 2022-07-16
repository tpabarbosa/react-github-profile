import { GithubRepository } from "../../contexts/Github";
import { BsStarFill, BsEyeFill, BsInfoCircleFill } from 'react-icons/bs'
import { BiGitRepoForked} from 'react-icons/bi'
import { GoRepo, GoIssueOpened } from 'react-icons/go';
import styled, { ThemeProps } from "styled-components";
import { AppThemeType } from "../../Theme/theme.types";

export type RepositoryTypes = 'repository' | 'starred'

type RepositoryCardProps = {
    repo: GithubRepository;
    type: RepositoryTypes;
}

export const RepositoryCard = ({type, repo}: RepositoryCardProps) => {
    const getDate = (updated_at: Date) => {
        const date = new Date(updated_at)
        return date.toLocaleString('en', {year: 'numeric', month: 'long', day: 'numeric' })
    }

    return (
        <Style.Wrapper className="primary">
            <Style.Title><a className="link" href={repo.html_url} target="_blank" rel="noreferrer"><GoRepo /> {repo.name}</a></Style.Title>
            {type==='starred' &&
            <Style.OwnerWrapper >
                <Style.Avatar src={repo.owner.avatar_url} />
                <Style.Description>@{repo.owner.login}</Style.Description>
            </Style.OwnerWrapper>
            }
            <Style.Counters className="secondary">
                <Style.Counter>
                    <label><BsStarFill /></label>
                    <p>{repo.stargazers_count}</p>
                </Style.Counter>
                <Style.Counter>
                    <label><BsEyeFill /></label>
                    <p>{repo.watchers_count}</p>
                </Style.Counter>
                <Style.Counter>
                    <label><BiGitRepoForked /></label> 
                    <p>{repo.forks_count}</p>
                </Style.Counter>
                <Style.Counter>
                    <label><GoIssueOpened /></label> 
                    <p>{repo.open_issues_count}</p>
                </Style.Counter>
            </Style.Counters>
            
            <Style.DataWrapper>
                <Style.Data>
                    Main language: <strong>{repo.language}</strong>
                </Style.Data>
                <Style.Data>
                    Last update at <strong>{getDate(repo.updated_at)}</strong>.
                </Style.Data>
            </Style.DataWrapper>
            {repo.description &&
            <Style.Description><BsInfoCircleFill /> {repo.description}</Style.Description>
            }
        </Style.Wrapper>
    )
}

const Style = {
    Wrapper: styled.div<ThemeProps<AppThemeType>>(({theme}) => `
        padding: 2rem 2rem;
        width: 90%;
        margin: 2rem auto;
        box-shadow: 0px 5px 10px 0px ${theme.shadow};
        display: flex;
        flex-direction: column;
        
        @media (min-width: 768px) {
            max-width: 25rem;
        }
    `),
    Title: styled.h3`
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    `,
    OwnerWrapper: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    `,
    Avatar: styled.img`
        width: 2.5rem;
        height: 2.5rem;
        border-radius:50%;
    `,
    Description: styled.p`
        margin: 1.5rem 0;
        font-size: 1.2rem;
    `,
    DataWrapper: styled.div`
        padding-bottom: 1rem;
        border-bottom: 1px solid;
    `,
    Data: styled.p`
        margin-bottom: 0.8rem;
        font-size: 0.8rem;
        text-align: right;
    `,
    Counters: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        padding-top: 0.5rem;
    `,
    Counter: styled.span`
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;

        label {
            font-size: 1.2rem;
            margin: 0.5rem;
        }
    `,
}