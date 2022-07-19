import styled, { ThemeProps } from 'styled-components';
import { AppThemeType } from '../../Theme/theme.types';
import { UserStatus } from '../UserStatus';
import { User } from '../User';
import useGithub from '../../contexts/Github';
import { UserPanel } from '../UserPanel';
import { Message } from '../Message';


export const Content = () => {
    const {state, stateMsg} = useGithub();

    return (
        <Styled.Wrapper className='primary'>
            {state === 'success' &&
                <>
                    <User />
                    <UserStatus />
                    <UserPanel />
                </>
            }
            {state==='empty' && 
                <Message message='Type a username into the search box to get started'  />
            }
            {state==='loading' && 
                <Message message='Loading... please wait'  />
            }
            {state==='error' && 
                <Message message={stateMsg} />
            }
        </Styled.Wrapper>
    );
}

const Styled = {
    Wrapper: styled.main<ThemeProps<AppThemeType>>(({theme}) => `
        padding: 2rem 0;
    `),
};
