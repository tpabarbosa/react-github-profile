import styled, { ThemeProps } from 'styled-components';
import useGithub from '../../contexts/Github';
import { AppThemeType } from '../../Theme/theme.types';

export const User = () => {
    const {user} = useGithub();
    
    return (
        <Styled.Wrapper className="secondary">
            {user &&
            <Styled.DataWrapper>
            <div>
                {user.avatar_url &&
                <Styled.Avatar src={user.avatar_url} alt="user avatar"/>
                }
            </div>
            <div>
                <Styled.Title>{user.name}</Styled.Title>
                <Styled.SubTitle>@{user.login}</Styled.SubTitle>
                {user.bio && 
                <Styled.Bio>
                    <span>{user.bio}</span>
                </Styled.Bio>
                }
                {user.email &&
                <Styled.Data>
                    <span>{user.email}</span>
                </Styled.Data>
                }
                {user.company &&
                <Styled.Data>
                    <strong>Company:</strong>
                    <span>{user.company}</span>
                </Styled.Data>
                }
                {user.location &&
                <Styled.Data>
                    <strong>Location:</strong>
                    <span>{user.location}</span>
                </Styled.Data>
                }
                {user.blog && 
                <Styled.Data>
                    <strong>Blog:</strong>
                    <span><a className='link' href={user.blog} target="_blank" rel="noreferrer">{user.blog}</a></span>
                </Styled.Data>
                }
            </div>
            </Styled.DataWrapper>
            }
        </Styled.Wrapper>
    );
}

const Styled = {
    Wrapper: styled.div<ThemeProps<AppThemeType>>(({theme}) => `
        padding: 2rem;
        
    `),
    DataWrapper: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        @media (min-width: 768px) {
            margin: 0 auto;
            flex-direction: row;
            justify-content: space-around;
            max-width: 70%;
        }
    `,
    Avatar: styled.img<ThemeProps<AppThemeType>>(({theme}) => `
        width: 14rem;
        height: 14rem;
        border-radius: 50%;
        margin: 1rem;
        box-shadow: 0px 0px 6px 6px ${theme.shadow};
    `),
    Title: styled.h2`
        font-size: 1.8rem;
        font-weight: bold;
        text-align: center;
    `,
    SubTitle: styled.h2`
        font-size: 1.6rem;
        font-weight: bold;
        margin-top: 1rem;
        text-align: center;
    `,
    Bio: styled.p`
        line-height: 1.6rem;
        font-size: 1.2rem;
        width: 100%;
        margin: 2.5rem 0;
        font-style: italic;
        text-align: center;
    `,
    Data: styled.div`
        width: 100%;
        margin: 1rem 0;
        strong {
            margin: 0.5rem;
            font-weight: bold;
        }
    `,
};
