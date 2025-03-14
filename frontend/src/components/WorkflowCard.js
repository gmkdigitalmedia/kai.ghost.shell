import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
  Grid,
  LinearProgress
} from '@mui/material';

// Helper function to get color based on status
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
  if (!timestamp) return 'N/A';
  return new Date(timestamp).toLocaleString();
};

const WorkflowCard = ({ workflow }) => {
  if (!workflow) {
    return (
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardHeader title="Workflow Not Found" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            No workflow data available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const { patient_id, status, steps, timestamp } = workflow;

  return (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardHeader
        title={`Patient ID: ${patient_id}`}
        subheader={`Workflow initiated: ${formatTimestamp(timestamp)}`}
        action={
          <Chip
            label={status}
            color={getStatusColor(status)}
            size="medium"
            sx={{ fontWeight: 'bold' }}
          />
        }
      />
      <Divider />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Workflow Steps
        </Typography>
        {steps && steps.length > 0 ? (
          <Grid container spacing={2}>
            {steps.map((step, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {step.name.replace(/_/g, ' ')}
                  </Typography>
                  <Chip
                    label={step.status}
                    color={getStatusColor(step.status)}
                    size="small"
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  {formatTimestamp(step.timestamp)}
                </Typography>
                {step.status === 'pending' && (
                  <LinearProgress sx={{ mt: 0.5 }} />
                )}
                {index < steps.length - 1 && <Divider sx={{ my: 1.5 }} />}
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No steps available for this workflow
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkflowCard; 