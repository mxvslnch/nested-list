import { FC, memo, ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: max-content;
    padding: 20px;
    border: 1px solid red;
    margin-bottom: -1px;
`;

const ParentTitle = styled.div`
    font-size: 16px;
    margin-bottom: 12px;
    color: #696969;
`;

const Title = styled.div`
    font-size: 20px;
    margin-bottom: 16px;
`;

interface Props {
    title: string;
    parent?: string;
    children: ReactNode;
}

export const Card: FC<Props> = memo(({ title, parent, children }) => {
    return <Wrapper>
        {parent && <ParentTitle>Child of #{parent}</ParentTitle>}
        <Title>{title}</Title>
        {children}
    </Wrapper >
})