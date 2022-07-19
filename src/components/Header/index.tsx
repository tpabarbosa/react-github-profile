import styled from 'styled-components';
import { SearchBox } from '../SearchBox';
import { BsGithub } from 'react-icons/bs'

import { ThemeToggler } from '../ThemeToggler';

export const Header = () => {

    return (
        <Styled.Wrapper className='tertiary'>
            <Styled.AppTop>
                <Styled.Title>
                    <BsGithub data-icon='github'/>
                    Github Profile Viewer
                </Styled.Title>
                <ThemeToggler />
            </Styled.AppTop>
            <SearchBox />
        </Styled.Wrapper>
    );
}

const Styled = {
    Wrapper: styled.header`
        padding: 1rem 1rem;
    `,
    AppTop: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 2rem;
        padding-bottom: 1rem;
        gap: 2rem;
    `,
    Title: styled.h1`
        display: flex;
        align-items: center;
        gap: 2rem;
    `,
    
};
