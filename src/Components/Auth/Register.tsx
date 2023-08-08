import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Link as MuiLink, Grid , IconButton} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'; 
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';

interface RegisterProps {
  isLoggedIn: boolean;
  handleLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ isLoggedIn, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationError, setRegistrationError] = useState<string | null>(null); // State for registration error
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User registered successfully:', userCredential.user);
        handleLogin(); // Set isLoggedIn to true
        navigate('/');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        // Show error notification for user already exists
        setRegistrationError('User already exists. Please login instead.');
      });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      handleLogin(); // Set isLoggedIn to true
      navigate('/');
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Register
      </Typography>
      <form onSubmit={signUp}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
          
          <Grid item xs={12} sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={signInWithGoogle} color="primary">
              <GoogleIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
      {registrationError && (
        <Typography variant="body1" sx={{ marginTop: '20px', textAlign: 'center', color: 'red' }}>
          {registrationError}
        </Typography>
      )}
      <Typography variant="body1" sx={{ marginTop: '20px', textAlign: 'center' }}>
        Already have an account?{' '}
        <MuiLink component={Link} to="/login" underline="hover" color="primary">
          Log In Now
        </MuiLink>
      </Typography>
    </Container>
  );
};

export default Register;
