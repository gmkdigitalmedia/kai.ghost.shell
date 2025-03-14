import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  BubbleChart as BubbleChartIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const mainMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Workflows', icon: <AssessmentIcon />, path: '/dashboard/workflows' },
    { text: 'Patients', icon: <PersonIcon />, path: '/dashboard/patients' }
  ];

  const adminMenuItems = [
    { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: 250,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            bgcolor: 'primary.main',
            color: 'white'
          }}
        >
          <BubbleChartIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            KAI.ghost.shell
          </Typography>
        </Box>
        
        <List sx={{ flexGrow: 1 }}>
          {mainMenuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        
        <Divider />
        
        <List>
          {adminMenuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography variant="caption" color="text.secondary">
            KAI.ghost.shell v0.1.0
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            CEO: GP Shangari
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 