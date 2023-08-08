// Footer.tsx
import React from 'react';
import { AppBar, Toolbar, IconButton, Link } from '@mui/material';
import { LinkedIn, Email, Twitter, Instagram } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <AppBar position="static" style={{ position: 'fixed', bottom: 0, width: '100%', height: '55px' }}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          {/* Social Media Icons */}
          <IconButton color="inherit" component={Link} href="https://www.linkedin.com/in/your-linkedin-profile/">
            <LinkedIn />
          </IconButton>
          <IconButton color="inherit" component={Link} href="mailto:your-email@example.com">
            <Email />
          </IconButton>
          <IconButton color="inherit" component={Link} href="https://twitter.com/your-twitter-profile/">
            <Twitter />
          </IconButton>
          <IconButton color="inherit" component={Link} href="https://www.instagram.com/your-instagram-profile/">
            <Instagram />
          </IconButton>
        </div>
        <div>
          {/* Copyright Information */}
          Copyright @ 2023 (Built By Govind Shakya)
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
