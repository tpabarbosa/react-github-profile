import styled, { ThemeProps } from 'styled-components';
import { AppThemeType } from '../../Theme/theme.types';
import { BsSearch } from 'react-icons/bs'
import useGithub from '../../contexts/Github';
import { useState } from 'react';

export const SearchBox = () => {
    const [username, setUsername] = useState('')
    const {state, getUser} = useGithub();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const success = await getUser(username);
        if (success) {
            
        }
        setUsername('');
    }

    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUsername(e.target.value)
    }

    return (
        <Styled.Wrapper className="secondary" onSubmit={handleSubmit}>
            <BsSearch />
            <Styled.Input 
                placeholder="Type a profile username to search"
                onChange={handleChangeUsername}
                value={username}
            ></Styled.Input>
            <Styled.Button type='submit' className='btn' disabled={state==='loading' || username===''} >Search</Styled.Button>
        </Styled.Wrapper>
    );
}

const Styled = {
    Wrapper: styled.form<ThemeProps<AppThemeType>>(({theme}) => `
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 100%;
        margin: 0 auto;
        padding-left: 1rem;
        border-radius: 20px;
        overflow: hidden;

        @media (min-width: 768px) {
            max-width: 80%;
        }
    `),
    Input: styled.input<ThemeProps<AppThemeType>>(({theme}) => `
        flex: 1;
        font-size: 1rem;
        padding: 0.8rem 0.6rem;
    `),
    Button: styled.button`
        padding: 0.8rem 1rem;
    `
};