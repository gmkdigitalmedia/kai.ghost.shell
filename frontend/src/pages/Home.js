import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Link,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EmailIcon from '@mui/icons-material/Email';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" gutterBottom>
            KAI.ghost.shell
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Pathology Report Workflow Automation Demo
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: '800px' }}>
            A technology demonstration for Antler Tokyo showcasing KAI.ghost.shell's ability to automate hospital workflows triggered by pathology reports.
          </Typography>
          <Button
            component={RouterLink}
            to="/dashboard"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mr: 2 }}
          >
            View Dashboard
          </Button>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            color="inherit"
            size="large"
          >
            Login
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h2" component="h2" align="center" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <NotificationsActiveIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Slack Notifications
                </Typography>
                <Typography variant="body2">
                  Instantly notify hospital staff about critical pathology results via Slack, ensuring timely response.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <EventNoteIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Notion Logging
                </Typography>
                <Typography variant="body2">
                  Automatically log all actions in Notion, providing an auditable trail for compliance and review.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <EmailIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Email Confirmations
                </Typography>
                <Typography variant="body2">
                  Send automated email confirmations to patients about rescheduled appointments via Gmail API.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <DashboardIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Status Dashboard
                </Typography>
                <Typography variant="body2">
                  Monitor workflow status in real-time through an intuitive dashboard interface.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Demo Flow Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6, mb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" align="center" gutterBottom>
            Demo Flow
          </Typography>
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              1. Trigger a mock pathology report for a patient
            </Typography>
            <Typography variant="body1" paragraph>
              Enter a patient ID to generate a mock pathology report with cancer detection.
            </Typography>

            <Typography variant="h6" component="h3" gutterBottom>
              2. Watch as the system:
            </Typography>
            <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
              <li>Posts a notification to Slack</li>
              <li>Logs the action in Notion</li>
              <li>Reschedules the appointment via the mock hospital API</li>
              <li>Sends a confirmation email</li>
              <li>Updates the dashboard status</li>
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © 2025 KAI.ghost.shell - A technology demonstration for Antler Tokyo
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Link color="inherit" href="#" sx={{ mx: 1 }}>
              About
            </Link>
            <Link color="inherit" href="#" sx={{ mx: 1 }}>
              Documentation
            </Link>
            <Link color="inherit" href="#" sx={{ mx: 1 }}>
              Contact
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 