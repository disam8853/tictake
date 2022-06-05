import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  { signUp } from '../axios/index'
import Modal from '@mui/material/Modal';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '} {'tictake@'}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    // bgcolor: 'background.paper',
    bgcolor: 'white',
    color: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function BuyTicketModal(
    props: { id: string }
) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(event)

  };

  return (
    <ThemeProvider theme={darkTheme}>
        <Button fullWidth  onClick={handleOpen}>{'BUY !!!'}</Button>
        <Modal
            open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <EmojiPeopleIcon 
             />
          </Avatar>
          <Typography component="h1" variant="h4">
            {props.id}
          </Typography>
          <Typography component="h5" variant="h5">
            Buy It Right Now !

          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Purchase
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      </Box>
    </Modal>
    </ThemeProvider>
  );
}