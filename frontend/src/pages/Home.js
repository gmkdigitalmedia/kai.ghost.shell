import React from 'react';
import { Container, Typography, Button, Grid, Box, Paper, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function Home() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            color: 'white',
            py: 8
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography 
                            variant="h2" 
                            gutterBottom 
                            sx={{ 
                                fontWeight: 'bold',
                                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 3
                            }}
                        >
                            KAI.ghost.shell
                        </Typography>
                        <Typography variant="h5" paragraph sx={{ color: '#e0e0e0', mb: 4 }}>
                            Revolutionizing Healthcare Workflow Automation with AI
                        </Typography>
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                p: 3, 
                                mb: 4, 
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            <Typography variant="h6" gutterBottom sx={{ color: '#4ECDC4' }}>
                                CEO: GP Shangari
                            </Typography>
                            <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                            <Typography variant="body1" paragraph>
                                Email: <a href="mailto:gmkdigitalmedia@gmail.com" style={{ color: '#4ECDC4', textDecoration: 'none' }}>gmkdigitalmedia@gmail.com</a>
                            </Typography>
                            <Typography variant="body1">
                                LinkedIn: <a href="https://www.linkedin.com/in/gp-shangari-6166312a6/" target="_blank" rel="noopener noreferrer" style={{ color: '#4ECDC4', textDecoration: 'none' }}>GP Shangari</a>
                            </Typography>
                        </Paper>
                        <Button 
                            variant="contained" 
                            size="large"
                            component={Link} 
                            to="/login"
                            sx={{
                                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                                color: 'white',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #FF5252, #45B7AF)',
                                },
                                px: 4,
                                py: 1.5
                            }}
                        >
                            Get Started
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box 
                            sx={{ 
                                textAlign: 'center',
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '100%',
                                    height: '100%',
                                    background: 'radial-gradient(circle, rgba(78,205,196,0.1) 0%, rgba(255,107,107,0.1) 100%)',
                                    borderRadius: '50%',
                                    zIndex: 0
                                }
                            }}
                        >
                            <img 
                                src="/pathology-image.svg" 
                                alt="Pathology Workflow" 
                                style={{ 
                                    maxWidth: '100%',
                                    borderRadius: '10px',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                    position: 'relative',
                                    zIndex: 1
                                }} 
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Home; 