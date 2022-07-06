import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export const FooterButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 10px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #828282;
  border-radius: 8px;
  color: #fcfcfd;
  background: rgba(41, 45, 54, 0.5);
  width: 360px;
  height: 48px;
`;

export const MainDefaultBtn = styled(Button)({
  width: "133px",
  height: "37px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  padding: "10px 16px",
  borderRadius: "8px",
  textTransform: "capitalize",
  backgroundColor: "#3f4550",
  color: "white",
  "&:hover": {
    width: "133px",
    height: "37px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    borderRadius: "8px",
    backgroundColor: "#686d73",
  },
});

export const SymbolBtn = styled(IconButton)({
  width: "161px",
  height: "36px",
  display: "flex",
  textTransform: "capitalize",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  borderRadius: "8px",
  backgroundColor: "#4f545c",
  color: "white",
  fontFamily: "Lato",
  fontSize: "14px",
  fontWeight: "600",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "normal",
  textAlign: "left",
  "&:hover": {
    width: "161px",
    height: "36px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    borderRadius: "8px",
    backgroundColor: "#686d73",
  },
});

export const OutlinedBtn = styled(Button)({
  width: "133px",
  height: "37px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  textTransform: "capitalize",
  gap: "8px",
  borderRadius: "8px",
  border: "solid 1px white",
  backgroundColor: "#36393f",
  color: "white",
  fontFamily: "Lato",
  fontSize: "14px",
  fontWeight: "600",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "normal",
  textAlign: "left",
  "&:hover": {
    width: "133px",
    height: "37px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    borderRadius: "8px",
    border: "solid 1px white",
    backgroundColor: "#4f545c",
  },
});

export const OutlinedSymbolBtn = styled(IconButton)({
  width: "161px",
  height: "36px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  borderRadius: "8px",
  textTransform: "capitalize",
  border: "solid 1px white",
  backgroundColor: "#36393f",
  color: "white",
  fontFamily: "Lato",
  fontSize: "14px",
  fontWeight: "600",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "normal",
  textAlign: "left",
  "&:hover": {
    width: "161px",
    height: "36px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    borderRadius: "8px",
    border: "solid 1px white",
    backgroundColor: "#4f545c",
  },
});

export const TextBtn = styled(Button)({
  width: "133px",
  height: "37px",
  textTransform: "capitalize",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  borderRadius: "8px",
  color: "#c49eff",
  fontFamily: "Lato",
  fontSize: "14px",
  fontWeight: "600",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "normal",
  textAlign: "left",
  "&:hover": {
    width: "133px",
    height: "37px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
});

export const IconBtn = styled(IconButton)({
  width: "32px",
  height: "32px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  borderRadius: "8px",
  border: "solid 1px white",
  fontFamily: "Lato",
  fontSize: "14px",
  fontWeight: "600",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "normal",
  textAlign: "left",
  "&:hover": {
    width: "32px",
    height: "32px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    borderRadius: "8px",
    backgroundColor: "#4f545c",
  },
});
