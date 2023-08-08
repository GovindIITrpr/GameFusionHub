import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Link as MuiLink, Grid, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';

interface LoginProps {
  isLoggedIn: boolean;
  handleLogin: () => void;
}
const Login: React.FC<LoginProps> = ({ isLoggedIn, handleLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null); // Add error state variable
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      handleLogin(); // Set isLoggedIn to true
      navigate('/');
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError(null); // Reset error message before login attempt

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User logged in successfully:', userCredential.user);
        handleLogin(); // Set isLoggedIn to true
        navigate('/');
      })
      .catch((error) => {
        console.error('Error during login:', error);
        if (error.code === 'auth/user-not-found') {
          setLoginError('User does not exist. Please register first.'); // Set error message for user not exist
        } else {
          setLoginError('An error occurred during login. Please try again.'); // Set generic error message
        }
      });
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Login
      </Typography>
      <form onSubmit={signIn}>
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
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={signInWithGoogle} color="primary">
              <GoogleIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
      {loginError && (
        <Typography variant="body2" color="error" sx={{ marginTop: '10px' }} >
          {loginError}
        </Typography>
      )}
      <Typography variant="body1" sx={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account yet?{' '}
        <MuiLink component={Link} to="/register" underline="hover" color="primary">
          Register Now
        </MuiLink>
      </Typography>

    </Container>
  );
};

export default Login;
