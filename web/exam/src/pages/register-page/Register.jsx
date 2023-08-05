import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './Register.module.css';

const Register = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant='contained'
        className={styles.register}
        onClick={handleOpen}
      >
        Register
      </Button>
      <Dialog className={styles.content} open={open} onClose={handleClose}>
        <DialogTitle className={styles.title}>Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create your guest list for your event, please enter your
            credentials
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Your name'
            type='text'
            fullWidth
            variant='standard'
          />
          <TextField
            margin='dense'
            id='email'
            label='Email address'
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField
            margin='dense'
            id='password'
            label='Create password'
            type='password'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={styles.submit}>
            Cancel
          </Button>
          <Button onClick={handleClose} className={styles.submit}>
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Register;
