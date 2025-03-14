import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';

import { useAuth } from '../auth/AuthContext';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import WorkflowCard from '../components/WorkflowCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [loading, setLoading] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [workflowStatuses, setWorkflowStatuses] = useState([]);
  const [report, setReport] = useState(null);

  // Check authentication
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Fetch workflow statuses
  useEffect(() => {
    const fetchWorkflowStatuses = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would call the backend API with proper auth
        // For demo purposes, we'll simulate a delay and use mock data
        // const response = await axios.get('/api/workflow/status');
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

    if (currentUser) {
      fetchWorkflowStatuses();
    }
  }, [currentUser]);

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
      // const reportResponse = await axios.get(`/api/pathology/report/${patientId}`);
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
      // const workflowResponse = await axios.post('/api/workflow/trigger', { patient_id: patientId });
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

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DashboardHeader 
        title="Pathology Workflow Dashboard" 
        onMenuOpen={() => setSidebarOpen(true)} 
      />
      
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          bgcolor: 'background.default' 
        }}
      >
        <Container maxWidth="lg">
          {currentUser && currentUser.org_id && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom>
                Welcome to {currentUser.org_id}
              </Typography>
              <Divider />
            </Box>
          )}
          
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
                  {triggering ? <CircularProgress size={24} color="inherit" /> : 'Trigger Workflow'}
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ mr: 1 }}>Status:</Typography>
                    <Alert severity="error" icon={false} sx={{ py: 0 }}>
                      {report.status}
                    </Alert>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ mr: 1 }}>Severity:</Typography>
                    <Alert severity="error" icon={false} sx={{ py: 0 }}>
                      {report.severity}
                    </Alert>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ mr: 1 }}>Follow-up Required:</Typography>
                    <Alert 
                      severity={report.follow_up_required ? "warning" : "success"} 
                      icon={false} 
                      sx={{ py: 0 }}
                    >
                      {report.follow_up_required ? 'Yes' : 'No'}
                    </Alert>
                  </Box>
                  <Typography variant="subtitle1">Date: {formatTimestamp(report.timestamp)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">Findings:</Typography>
                  <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                    {report.findings.description}
                  </Typography>
                  <Typography variant="subtitle2">Details:</Typography>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="body2">Cell Abnormality: {report.findings.details.cell_abnormality}</Typography>
                    <Typography variant="body2">Tissue Damage: {report.findings.details.tissue_damage}</Typography>
                    <Typography variant="body2">Tumor Markers: {report.findings.details.tumor_markers}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}
          
          {/* Workflow Status Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Workflow Status
            </Typography>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : workflowStatuses.length > 0 ? (
              workflowStatuses.map((workflow, index) => (
                <WorkflowCard key={index} workflow={workflow} />
              ))
            ) : (
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="body1" align="center" color="text.secondary">
                    No workflow data available
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard; 