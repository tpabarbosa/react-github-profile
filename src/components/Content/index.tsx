import styled, { ThemeProps } from 'styled-components';
import { AppThemeType } from '../../Theme/theme.types';
import { UserStatus } from '../UserStatus';
import { User } from '../User';
import useGithub from '../../contexts/Github';
import { UserPanel } from '../UserPanel';
import { ErrorMessage } from '../Error';
import { Loading } from '../Loading';

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
            
            {state==='loading' && 
                <Loading />
            }
            {state==='error' && 
                <ErrorMessage message={stateMsg} />
            }
        </Styled.Wrapper>
    );
}

const Styled = {
    Wrapper: styled.main<ThemeProps<AppThemeType>>(({theme}) => `
        padding: 2rem 0;
    `),
};
