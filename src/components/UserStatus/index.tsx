import { useEffect, useState } from 'react';
import styled, { ThemeProps } from 'styled-components';
import useGithub from '../../contexts/Github';
import { AppThemeType } from '../../Theme/theme.types';

export const UserStatus = () => {
    const {user} = useGithub();
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if(user) {
            setDate(new Date(user.created_at))
        }
    }, [user])
     
    return (
        <Styled.Wrapper className='secondary'>
            {user &&
            <>
            <Styled.DataWrapper>
                {user.followers !== 0 &&
                <Styled.Data>
                    <strong>Followers</strong>
                    <span aria-label='followers count' >{user.followers}</span>
                </Styled.Data>
                }
                {user.following !== 0 &&
                <Styled.Data>
                    <strong>Followings</strong>
                    <span aria-label='following count' >{user.following}</span>
                </Styled.Data>
                }
                {user.public_gists !== 0 &&
                <Styled.Data>
                    <strong>Gists</strong>
                    <span aria-label='gists count' >{user.public_gists}</span>
                </Styled.Data>
                }
                <Styled.Data>
                    <strong>Repos</strong>
                    <span aria-label='repositories count' >{user.public_repos}</span>
                </Styled.Data>
            </Styled.DataWrapper>
            <div>
                <Styled.Data>
                    <strong>{user.name} is a Github {user.type} since</strong>
                    <span>{date.toLocaleString('en', {year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </Styled.Data>
            </div>
            </>
            }
            
        </Styled.Wrapper>
        
    );
}

const Styled = {
    Wrapper: styled.div<ThemeProps<AppThemeType>>(({theme}) => `
        padding: 1rem 1rem;
    `),
    Title: styled.h1`
        font-size: 2rem;
        padding-bottom: 1rem;
    `,
    DataWrapper: styled.div`
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        
        @media (min-width: 768px) {
            max-width: 80%;
        }
    `,
    Data: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem 0;
        font-size: 1.2rem;
        strong {
            font-weight: bold;
            font-size: 1rem;
            margin-bottom: 0.6rem;
        }
    `,
};