import styled from "styled-components";

export const PageStyled = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FormStyled = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 350px;
    height: 250px;
    border-radius: 20px;

    div {
        margin: 5px;
    }
`;

export const InputStyled = styled.input`
    background: transparent;
    border: 1px solid black;
    padding: 5px;
    border-radius: 6px;
    font-size: 18px;
`;

export const ButtonStyled = styled.button`
    padding: 8px 12px;
    font-size: 16px;
    background: black;
    color: white;
    border-radius: 20px;
    border: none;

    &:hover {
        cursor: pointer;
    }
`;

export const RegisterHereStyled = styled.div`
    font-size: 14px;
`;

export const ErrorsStyled = styled.p`
    color: red;
    margin-top: 8px;
    margin-left: 5px;
`;
