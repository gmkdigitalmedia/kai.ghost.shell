import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [loading, setLoading] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [workflowStatuses, setWorkflowStatuses] = useState([]);
  const [report, setReport] = useState(null);

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch workflow statuses
  useEffect(() => {
    const fetchWorkflowStatuses = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would call the backend API
        // For demo purposes, we'll simulate a delay and use mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock API response
        const response = {
          data: [
            {
              patient_id: 'P12345',
              status: 'completed',
              steps: [
                { name: 'slack_notification', status: 'completed', timestamp: '2025-03-14T09:15:00Z' },
                { name: 'notion_logging', status: 'completed', timestamp: '2025-03-14T09:15:05Z' },
                { name: 'appointment_rescheduling', status: 'completed', timestamp: '2025-03-14T09:15:10Z' },
                { name: 'email_notification', status: 'completed', timestamp: '2025-03-14T09:15:15Z' }
              ],
              timestamp: '2025-03-14T09:15:00Z'
            }
          ]
        };
        
        setWorkflowStatuses(response.data);
      } catch (err) {
        console.error('Error fetching workflow statuses:', err);
        setError('Failed to fetch workflow statuses');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflowStatuses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleTriggerWorkflow = async () => {
    if (!patientId) {
      setError('Please enter a patient ID');
      return;
    }

    setTriggering(true);
    setError('');
    setSuccess('');
    setReport(null);

    try {
      // First, get the pathology report
      // In a real implementation, this would call the backend API
      // For demo purposes, we'll simulate a delay and use mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock pathology report
      const reportResponse = {
        data: {
          patient_id: patientId,
          report_id: `PTH-${Math.floor(10000 + Math.random() * 90000)}`,
          report_type: 'Biopsy',
          status: 'Cancer detected',
          severity: 'High',
          doctor: 'Dr. Tanaka',
          hospital: 'Tokyo General Hospital',
          timestamp: new Date().toISOString(),
          follow_up_required: true,
          findings: {
            description: `Patient ${patientId} shows signs of cancer detected. Further examination is advised.`,
            details: {
              cell_abnormality: 'Detected',
              tissue_damage: 'Moderate',
              tumor_markers: 'Elevated'
            }
          }
        }
      };
      
      setReport(reportResponse.data);
      
      // Then, trigger the workflow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock workflow trigger response
      const workflowResponse = {
        data: {
          patient_id: patientId,
          status: 'completed',
          steps: [
            { name: 'slack_notification', status: 'completed', timestamp: new Date().toISOString() },
            { name: 'notion_logging', status: 'completed', timestamp: new Date(Date.now() + 2000).toISOString() },
            { name: 'appointment_rescheduling', status: 'completed', timestamp: new Date(Date.now() + 4000).toISOString() },
            { name: 'email_notification', status: 'completed', timestamp: new Date(Date.now() + 6000).toISOString() }
          ],
          timestamp: new Date().toISOString()
        }
      };
      
      // Add the new workflow status to the list
      setWorkflowStatuses(prev => [workflowResponse.data, ...prev]);
      
      setSuccess(`Workflow triggered successfully for patient ${patientId}`);
    } catch (err) {
      console.error('Error triggering workflow:', err);
      setError('Failed to trigger workflow');
    } finally {
      setTriggering(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" component="div">
          KAI.ghost.shell
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem button selected>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Patients" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pathology Workflow Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawer}
      </Drawer>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: 8,
        }}
      >
        <Container maxWidth="lg">
          {/* Trigger Workflow Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Trigger Pathology Workflow
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Patient ID"
                  variant="outlined"
                  placeholder="e.g., P12345"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  disabled={triggering}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PlayArrowIcon />}
                  onClick={handleTriggerWorkflow}
                  disabled={triggering || !patientId}
                  sx={{ height: '56px' }}
                >
                  {triggering ? 'Triggering...' : 'Trigger Workflow'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Pathology Report Section */}
          {report && (
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Pathology Report
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Patient ID: {report.patient_id}</Typography>
                  <Typography variant="subtitle1">Report ID: {report.report_id}</Typography>
                  <Typography variant="subtitle1">Type: {report.report_type}</Typography>
                  <Typography variant="subtitle1">Doctor: {report.doctor}</Typography>
                  <Typography variant="subtitle1">Hospital: {report.hospital}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">
                    Status: <Chip label={report.status} color="error" />
                  </Typography>
                  <Typography variant="subtitle1">
                    Severity: <Chip label={report.severity} color="error" />
                  </Typography>
                  <Typography variant="subtitle1">
                    Follow-up Required: <Chip label={report.follow_up_required ? 'Yes' : 'No'} color={report.follow_up_required ? 'warning' : 'success'} />
                  </Typography>
                  <Typography variant="subtitle1">Date: {formatTimestamp(report.timestamp)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Findings:</Typography>
                  <Typography variant="body2" paragraph>
                    {report.findings.description}
                  </Typography>
                  <Typography variant="subtitle2">Details:</Typography>
                  <Typography variant="body2">Cell Abnormality: {report.findings.details.cell_abnormality}</Typography>
                  <Typography variant="body2">Tissue Damage: {report.findings.details.tissue_damage}</Typography>
                  <Typography variant="body2">Tumor Markers: {report.findings.details.tumor_markers}</Typography>
                </Grid>
              </Grid>
            </Paper>
          )}
          
          {/* Workflow Status Section */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Workflow Status
            </Typography>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient ID</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Slack</TableCell>
                      <TableCell>Notion</TableCell>
                      <TableCell>Appointment</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Timestamp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workflowStatuses.length > 0 ? (
                      workflowStatuses.map((workflow, index) => (
                        <TableRow key={index}>
                          <TableCell>{workflow.patient_id}</TableCell>
                          <TableCell>
                            <Chip
                              label={workflow.status}
                              color={getStatusColor(workflow.status)}
                              size="small"
                            />
                          </TableCell>
                          {workflow.steps.map((step, stepIndex) => (
                            <TableCell key={stepIndex}>
                              <Chip
                                label={step.status}
                                color={getStatusColor(step.status)}
                                size="small"
                              />
                            </TableCell>
                          ))}
                          <TableCell>{formatTimestamp(workflow.timestamp)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No workflow data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 