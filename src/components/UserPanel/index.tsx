import { useState } from "react"
import styled, { ThemeProps } from "styled-components"
import useGithub from "../../contexts/Github"
import { AppThemeType } from "../../Theme/theme.types";
import { RepositoryCard } from "../RepositoryCard"

type TabTypes = 'repositories' | 'starred'

export const UserPanel = () => {
    const [tab, setTab] = useState<TabTypes>('repositories')
    const {repositories, starred} = useGithub()
    
    const handleTabChange = (newTab: TabTypes) => {
        // if (tab === newTab) return
        setTab(newTab)
    }

    return (
        <Styled.Wrapper className='tertiary'>
            <Styled.Panel >
                <Styled.TabButton 
                    isActive={tab==='repositories'}
                    disabled={tab==='repositories'}
                    className='btn' 
                    onClick={() => handleTabChange('repositories')}
                >
                    Repositories
                </Styled.TabButton>
                <Styled.TabButton 
                    isActive={tab==='starred'}
                    disabled={tab==='starred'}
                    className='btn' 
                    onClick={()=>handleTabChange('starred')}
                >
                    Starred
                </Styled.TabButton>
            </Styled.Panel>
            {tab==='repositories' && repositories.length > 0 &&
                <Styled.ListWrapper className="tertiary" >
                {repositories.map(repo => 
                    <RepositoryCard key={repo.id} type='repository' repo={repo}/>
                    )
                }
                </Styled.ListWrapper>
            }
            
            {tab==='starred' && starred.length > 0 &&
                <Styled.ListWrapper className="tertiary" >
                {starred.map(repo => 
                    <RepositoryCard key={repo.id} type='starred' repo={repo}/>
                    )
                }
                </Styled.ListWrapper>
            }
        </Styled.Wrapper>
    )
}

type TabBtnProps = {
    theme: ThemeProps<AppThemeType>
    isActive: boolean;
}

const Styled = {
    Wrapper: styled.div`
        margin: 2rem 0;
        padding: 1rem 0;
    `,
    ListWrapper: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 2rem 0;
    `,
    Panel: styled.div`
        margin: 2rem auto;
        display: flex;
        justify-content: space-around;

        @media (min-width: 768px) {
            max-width: 80%;
        }
    `,
    TabButton: styled.button<TabBtnProps>(({isActive, theme}) => `
        padding: 1.2rem 1rem;
        box-shadow: ${isActive ? `0px 0px 6px 6px ${theme.shadow}` : 'none'};
        min-width: 10rem;
        text-align: center;

        &:disabled {
            background-color: ${theme?.button?.background} !important;
            color: ${theme?.button?.color}!important;
        }
    `)
};