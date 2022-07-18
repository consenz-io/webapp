import { Button } from '@mui/material';

function LoginButton(props: { btnTitle: string; clickFn: () => void }) {
  return (
    <Button
      onClick={props.clickFn}
      variant="contained"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px 16px',
        gap: '10px',
        width: '360px',
        height: '48px',
        background: '#6d31dc',
        borderRadius: '8px',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        color: 'white',
      }}
    >
      {props.btnTitle}
    </Button>
  );
}
export function LoginFooterButton(props: { btnTitle: string; clickFn: () => void }) {
  return (
    <Button
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '12px 16px',
        gap: '10px',
        fontFamily: 'Lato',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '24px',
        border: '1px solid #828282',
        borderRadius: '8px',
        color: '#fcfcfd',
        background: 'rgba(41, 45, 54, 0.5)',
        width: '360px',
        height: '48px',
      }}
      variant="outlined"
      onClick={props.clickFn}
    >
      {props.btnTitle}
    </Button>
  );
}

export default LoginButton;
