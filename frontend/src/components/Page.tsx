import { Stack } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";
import { IFCProps } from "types";

const Fullsize = styled(Stack)`
  height: 100vh;
`;

export const Page: FC<IFCProps> = ({children}) => {
  return (
    <Fullsize>
      {children}
    </Fullsize>
  );
};
