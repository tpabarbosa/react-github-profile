import styled from "styled-components";

export const ErrorMessage = ({message}: {message: string}) => {
    return (
        <Styled.Wrapper className="tertiary">
            <Styled.Message>{message}</Styled.Message>
        </Styled.Wrapper>
    );
}

const Styled = {
    Wrapper: styled.div`
        margin: 2rem auto;
        padding: 2rem;
    `,
    Message: styled.div`
        margin: 2rem auto;
        padding: 2rem;
        font-size: 2rem;
        text-align: center;
    `
}