import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const profile = useSelector((state) => state.profile.profile);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/profile-form"
          sx={{
            flexGrow: 1,
            color: 'inherit',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Profile Manager
        </Typography>
        {profile && (
          <Typography sx={{ marginRight: 2 }}>
            {profile.name}
          </Typography>
        )}
        <Button color="inherit" component={Link} to="/profile-form">Form</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
