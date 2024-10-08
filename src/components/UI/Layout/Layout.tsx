import { FC, memo, PropsWithChildren } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 20px;
`

export const Layout: FC<PropsWithChildren> = memo(({ children }) => {
  return <Wrapper>{children}</Wrapper>;
});