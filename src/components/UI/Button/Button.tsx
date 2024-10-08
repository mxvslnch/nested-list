import { FC, memo } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    display: inline-block;
    padding: 12px 24px;
    font-size: 16px;
    color: white;
    background-color: #6200ee;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    text-transform: uppercase;
    font-weight: 500;
    transition: box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    &:hover {
        background-color: #3700b3;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }
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