import styled from "styled-components";

export const Loading = () => {
    return (
        <Styled.Wrapper>
            <Styled.Message>Loading... please wait</Styled.Message>
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