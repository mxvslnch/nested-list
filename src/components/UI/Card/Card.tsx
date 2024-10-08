import { FC, memo, ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: max-content;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  margin-bottom: 20px;
  
`;

const ParentTitle = styled.div`
  font-size: 14px;
  color: #757575;
  line-height: 1.6;
  margin-bottom: 8px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 18px;
  color: #333;
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