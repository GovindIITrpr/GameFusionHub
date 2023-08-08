import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, handleLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static"  style={{ height:'55px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '15px', padding: '10px' }}>
            Home
          </Link>
          <Link to="/page1" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '15px', padding: '10px' }}>
            page1
          </Link>
          <Link to="/page2" style={{ textDecoration: 'none', color: 'inherit', marginLeft: '15px', padding: '10px' }}>
            page2
          </Link>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

        {isLoggedIn ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Profile
                </Link>
              </MenuItem> 
              <MenuItem onClick={handleLogout}><Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Logout
                </Link></MenuItem>
            </Menu>
          </>
        ) : (
          <MenuItem ><Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Login
          </Link></MenuItem>
        )}
      </Toolbar>
    </AppBar>
  );
};

 
export default Header;
