import { FC, memo } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    padding: 15px;
    border: 3px solid blue;
    outline: none;
    background: transparent;
    font-size: 20px;
    border-radius: 16px;
`

interface Props {
    text: string;
    onClick: () => void;
}

export const Button: FC<Props> = memo(({ text, onClick }) => {
    return <StyledButton onClick={onClick}>
        {text}
    </StyledButton>
});