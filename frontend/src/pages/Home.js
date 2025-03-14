import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import NotesIcon from '@mui/icons-material/Notes';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ArticleIcon from '@mui/icons-material/Article';
import { useAuth } from '../auth/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser } = useAuth();

  const features = [
    {
      title: 'Pathology Report Management',
      description: 'Efficiently manage and access patient pathology reports in one secure location.',
      icon: <ArticleIcon fontSize="large" color="primary" />
    },
    {
      title: 'Automated Workflows',
      description: 'Trigger automated workflows based on pathology report findings, saving valuable time.',
      icon: <AutoFixHighIcon fontSize="large" color="primary" />
    },
    {
      title: 'Integrations',
      description: 'Seamlessly integrate with Slack, Notion, and email systems for unified communication.',
      icon: <NotesIcon fontSize="large" color="primary" />
    },
    {
      title: 'Patient Care Optimization',
      description: 'Improve patient care with faster response times and more efficient follow-up processes.',
      icon: <HealthAndSafetyIcon fontSize="large" color="primary" />
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          pt: 12,
          pb: 10,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                KAI.ghost.shell
              </Typography>
              <Typography
                variant="h5"
                component="p"
                gutterBottom
                sx={{ mb: 4, maxWidth: 600 }}
              >
                Automating hospital workflows triggered by pathology reports
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {currentUser ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => navigate('/dashboard')}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => navigate('/login')}
                      sx={{ px: 4, py: 1.5 }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                      onClick={() => window.open('https://github.com/your-org/kai-ghost-shell', '_blank')}
                    >
                      GitHub
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '350px',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: '250px',
                    height: '250px',
                    bgcolor: 'secondary.main',
                    borderRadius: '50%',
                    position: 'absolute',
                    opacity: 0.3
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: '5rem',
                    color: 'white',
                    position: 'relative',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  KAI
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 4 }}>
                  {feature.icon}
                  <Typography variant="h6" component="h3" sx={{ mt: 2, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 4, fontWeight: 700 }}
          >
            About KAI.ghost.shell
          </Typography>
          <Typography variant="body1" paragraph align="center">
            KAI.ghost.shell is a cutting-edge solution designed to modernize hospital workflows by
            automating processes triggered by pathology reports. Our platform integrates with
            existing systems like Slack, Notion, and Google Workspace to create a seamless
            experience for healthcare professionals.
          </Typography>
          <Typography variant="body1" paragraph align="center">
            By reducing manual tasks and improving communication, KAI.ghost.shell helps healthcare
            providers focus on what matters most: patient care.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ px: 4 }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: 'primary.dark',
          color: 'white',
          py: 4,
          mt: 'auto'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                KAI.ghost.shell
              </Typography>
              <Typography variant="body2">
                Modern solutions for healthcare workflows.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body2">
                Email: info@kaighostshell.com
              </Typography>
              <Typography variant="body2">
                Phone: (123) 456-7890
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Legal
              </Typography>
              <Typography variant="body2">
                © 2025 KAI.ghost.shell
              </Typography>
              <Typography variant="body2">
                CEO: GP Shangari
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 