import React from 'react';
import { Container, Typography, Button, Grid, Box, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SecurityIcon from '@mui/icons-material/Security';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const features = [
        {
            title: 'Smart Document Processing',
            description: 'AI agents automatically process and analyze documents like pathology reports, extracting key information and routing to relevant stakeholders.',
            icon: <DescriptionIcon fontSize="large" sx={{ color: '#0066cc' }} />
        },
        {
            title: 'Cross-Platform Integration',
            description: 'Seamless automation between Slack, Gmail, and other enterprise tools with LLM handling communication processing.',
            icon: <IntegrationInstructionsIcon fontSize="large" sx={{ color: '#0066cc' }} />
        },
        {
            title: 'Enterprise Security',
            description: 'Bank-grade security with role-based access control and encrypted data handling.',
            icon: <SecurityIcon fontSize="large" sx={{ color: '#0066cc' }} />
        },
        {
            title: '24/7 Intelligent Agents',
            description: 'Autonomous agents work round the clock, handling complex workflows like hospital scheduling and documentation.',
            icon: <AccessTimeIcon fontSize="large" sx={{ color: '#0066cc' }} />
        }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Navigation */}
            <AppBar position="static" color="transparent" elevation={0} sx={{ backgroundColor: '#fff' }}>
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                            KaiGS
                        </Typography>
                        <Box>
                            <Button component={Link} to="/login" color="inherit" sx={{ mr: 2 }}>
                                Login
                            </Button>
                            <Button 
                                component={Link} 
                                to="/login" 
                                variant="contained" 
                                sx={{ 
                                    bgcolor: '#0066cc',
                                    '&:hover': {
                                        bgcolor: '#0055bb',
                                    }
                                }}
                            >
                                Get Started
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Hero Section */}
            <Box sx={{ 
                flex: '1 0 auto',
                pt: 8,
                pb: 6
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography 
                                variant="h2" 
                                component="h1"
                                sx={{ 
                                    fontWeight: 'bold',
                                    mb: 2,
                                    color: '#333'
                                }}
                            >
                                Enterprise <span style={{ color: '#0066cc' }}>Automation</span> with AI Agents
                            </Typography>
                            <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4, lineHeight: 1.6 }}>
                                KAI.ghost.shell streamlines your enterprise workflows with intelligent agents. From healthcare pathology processing to cross-platform integrations, automate complex tasks with AI precision.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button 
                                    component={Link} 
                                    to="/login" 
                                    variant="contained" 
                                    size="large"
                                    sx={{ 
                                        bgcolor: '#0066cc',
                                        px: 4,
                                        py: 1.5,
                                        '&:hover': {
                                            bgcolor: '#0055bb',
                                        }
                                    }}
                                >
                                    Get Started
                                </Button>
                                <Button 
                                    component={Link} 
                                    to="/team" 
                                    variant="outlined" 
                                    size="large"
                                    sx={{ 
                                        borderColor: '#0066cc',
                                        color: '#0066cc',
                                        px: 4,
                                        py: 1.5
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <img 
                                    src="/world-network.svg" 
                                    alt="Global Network" 
                                    style={{ 
                                        maxWidth: '100%',
                                        borderRadius: '12px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                    }} 
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Box sx={{ 
                py: 10,
                bgcolor: '#f8f9fa'
            }}>
                <Container maxWidth="lg">
                    <Typography 
                        variant="h3" 
                        component="h2" 
                        align="center" 
                        gutterBottom
                        sx={{ 
                            fontWeight: 'bold',
                            mb: 8,
                            color: '#333'
                        }}
                    >
                        Enterprise-Grade AI Automation
                    </Typography>
                    <Typography 
                        variant="h6" 
                        align="center" 
                        color="text.secondary"
                        sx={{ 
                            maxWidth: 800,
                            mx: 'auto',
                            mb: 8
                        }}
                    >
                        From healthcare to finance, our AI agents streamline complex workflows through intelligent processing and seamless integrations.
                    </Typography>

                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} lg={3} key={index}>
                                <Card 
                                    sx={{ 
                                        height: '100%',
                                        borderRadius: '10px',
                                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                        },
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h6" component="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" align="center">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box 
                component="footer" 
                sx={{ 
                    py: 5,
                    bgcolor: '#333',
                    color: '#fff'
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                KAI.ghost.shell
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                Enterprise automation with AI precision
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="h6" gutterBottom>
                                Links
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Button component={Link} to="/" color="inherit" sx={{ textAlign: 'left', opacity: 0.7 }}>
                                    Home
                                </Button>
                                <Button component={Link} to="/team" color="inherit" sx={{ textAlign: 'left', opacity: 0.7 }}>
                                    Team
                                </Button>
                                <Button component={Link} to="/login" color="inherit" sx={{ textAlign: 'left', opacity: 0.7 }}>
                                    Login
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="h6" gutterBottom>
                                Legal
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                &copy; 2025 KAI.ghost.shell
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default Home; 