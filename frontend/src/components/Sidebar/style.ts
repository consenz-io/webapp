import styled from "styled-components";
import { Drawer as MuiDrawer } from "@mui/material";

export const Drawer = styled(MuiDrawer)`
    && {
        .MuiDrawer-paper {
            width: 15rem;
            box-sizing: border-box;
            background: ${props => props.theme.palette.background.sidebar};
        }
    }
`;

export const Container = styled.div`
  display: flex;
`;
