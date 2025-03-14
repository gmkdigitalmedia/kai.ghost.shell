import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Link,
  Paper
} from '@mui/material';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../auth/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // If user is already logged in, redirect to dashboard
  React.useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}
          >
            KAI.ghost.shell
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" gutterBottom>
            Pathology Report Workflow Automation
          </Typography>
        </Box>
        
        <LoginForm onSuccess={handleLoginSuccess} />
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account? Contact your administrator.
          </Typography>
          <Link component={RouterLink} to="/" variant="body2" sx={{ mt: 1, display: 'inline-block' }}>
            Back to Home
          </Link>
        </Box>
      </Container>
      
      <Box
        component="footer"
        sx={{
          py: 3,
          mt: 'auto',
          textAlign: 'center'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 KAI.ghost.shell - All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Login; 