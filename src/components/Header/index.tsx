import styled, { ThemeProps } from 'styled-components';
import { AppThemeType, ThemeMode } from '../../Theme/theme.types';
import { SearchBox } from '../SearchBox';
import { BsGithub, BsSunFill, BsMoonFill } from 'react-icons/bs'
import useTheme from '../../Theme/'

export const Header = () => {
    const [mode, toggler] = useTheme();

    return (
        <Styled.Wrapper className='tertiary'>
            <Styled.Title>
                <Styled.AppNameWrapper>
                    <BsGithub />
                    Github Profile Viewer
                </Styled.AppNameWrapper>
                <Styled.ThemeButtonWrapper mode={mode} onClick={toggler}>
                    <Styled.ThemeButton className='btn'>
                        {mode === 'light' ? <BsSunFill /> : <BsMoonFill />}
                    </Styled.ThemeButton>
                </Styled.ThemeButtonWrapper>
            </Styled.Title>
            
            <SearchBox />
            
        </Styled.Wrapper>
    );
}

type ThemeButtonProps = {
    mode: ThemeMode
    theme: ThemeProps<AppThemeType>
}

const Styled = {
    Wrapper: styled.header<ThemeProps<AppThemeType>>(({theme}) => `
        padding: 1rem 1rem;
    `),
    AppNameWrapper: styled.div`
        display: flex;
        align-items: center;
        gap: 2rem;
    `,
    Title: styled.h1`
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 2rem;
        padding-bottom: 1rem;
        gap: 2rem;
    `,
    ThemeButtonWrapper: styled.div<ThemeButtonProps>(({theme, mode}) => `
        min-width: 4rem;
        min-height: 2rem;
        cursor: pointer;
        background-color: ${theme.primary.background};
        border-radius: 30px;
        padding-left: ${mode === 'light' ? '0' : '2rem'};
        box-shadow: inset 0 0 11px 2px ${theme.primary.color};
        

        &:hover {
            background-color: ${theme.tertiary.background};
            color: ${theme.tertiary.color};

            button {
                background-color: ${theme.button.hover.background};
                color: ${theme.button.hover.color};
            }
        }
    `),
    ThemeButton: styled.button<ThemeProps<AppThemeType>>(({theme}) => `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
        border-radius: 50%;
        box-shadow: inset 0 0 3px 2px ${theme.secondary.color};
    `),
};
