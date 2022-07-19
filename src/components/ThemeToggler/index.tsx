import { BsMoonFill, BsSunFill } from "react-icons/bs";
import styled, { ThemeProps } from "styled-components";
import { AppThemeType, ThemeMode } from "../../Theme/theme.types";
import useTheme from '../../Theme/'

export const ThemeToggler = () => {
    const [mode, toggler] = useTheme();

    return (
        <Styled.ThemeButtonWrapper mode={mode} onClick={toggler}>
            <Styled.ThemeButton className='btn'>
                {mode === 'light' ? 
                    <BsSunFill aria-label='toggle to dark mode' data-icon='sun'/> : 
                    <BsMoonFill aria-label='toggle to light mode' data-icon='moon'/>
                }
            </Styled.ThemeButton>
        </Styled.ThemeButtonWrapper>
    )
}

type ThemeButtonProps = {
    mode: ThemeMode
    theme: ThemeProps<AppThemeType>
}

const Styled = {
    ThemeButtonWrapper: styled.section<ThemeButtonProps>(({theme, mode}) => `
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