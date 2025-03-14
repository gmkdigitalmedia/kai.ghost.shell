import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { useAuth } from '../auth/AuthContext';

const DashboardHeader = ({ title, onMenuOpen }) => {
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title || 'KAI.ghost.shell Dashboard'}
        </Typography>
        
        {currentUser && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {currentUser.org_id && (
              <Chip
                label={`Org: ${currentUser.org_id}`}
                color="secondary"
                size="small"
                sx={{ mr: 2, bgcolor: 'rgba(255, 255, 255, 0.15)' }}
              />
            )}
            
            <IconButton
              color="inherit"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>
                <Typography variant="body2">
                  {currentUser.email}
                </Typography>
              </MenuItem>
              {currentUser.role && (
                <MenuItem disabled>
                  <Typography variant="body2" color="text.secondary">
                    Role: {currentUser.role}
                  </Typography>
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader; 