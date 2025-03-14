import React from 'react';
import { Container, Typography, Box, Grid, Paper, Avatar, Divider } from '@mui/material';

function Team() {
    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)',
            py: 8
        }}>
            <Container maxWidth="lg">
                <Typography 
                    variant="h2" 
                    gutterBottom 
                    align="center"
                    sx={{ 
                        fontWeight: 'bold',
                        mb: 6,
                        color: '#333'
                    }}
                >
                    Our Team
                </Typography>
                
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={8} lg={6}>
                        <Paper 
                            elevation={4} 
                            sx={{ 
                                p: 4, 
                                borderRadius: '16px',
                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 16px 32px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Avatar 
                                    sx={{ 
                                        width: 180, 
                                        height: 180, 
                                        mb: 3,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                    }}
                                    alt="GP Shangari"
                                    src="/avatar-placeholder.png"
                                />
                                
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                                    GP Shangari
                                </Typography>
                                
                                <Typography variant="h6" gutterBottom sx={{ color: '#0066cc', mb: 3 }}>
                                    Chief Executive Officer
                                </Typography>
                                
                                <Divider sx={{ width: '100%', my: 3 }} />
                                
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                                            Email:
                                        </Typography>
                                        <Typography variant="body1" component="span">
                                            <a href="mailto:gmkdigitalmedia@gmail.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
                                                gmkdigitalmedia@gmail.com
                                            </a>
                                        </Typography>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                                            LinkedIn:
                                        </Typography>
                                        <Typography variant="body1" component="span">
                                            <a 
                                                href="https://www.linkedin.com/in/gp-shangari-6166312a6/" 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                style={{ color: '#0066cc', textDecoration: 'none' }}
                                            >
                                                GP Shangari
                                            </a>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Team; 