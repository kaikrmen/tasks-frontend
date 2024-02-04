'use client'

import * as React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const theme = useTheme();
  const { user } = useUser();

  if(user) {
    return (
      <Paper sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: 'url(https://source.unsplash.com/random/1600x900?technology)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.common.white,
      }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', p: 4, borderRadius: theme.shape.borderRadius }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
            Welcome to TaskMaster
          </Typography>
          <Typography variant="h5" sx={{ my: 3, fontSize: '1.2rem' }}>
            A modern task management app built with the power of Node.js, Next.js, TypeScript, MongoDB, and secured with Auth0.
          </Typography>
          <Typography sx={{ my: 2 }}>
            TaskMaster lets you create, manage, and track your tasks efficiently. Get started by adding your tasks and experience productivity like never before!
          </Typography>
          <Box mt={4}>
            <Button variant="contained" color="primary" href="/tasks">
              Go to Tasks
            </Button>
          </Box>
        </Container>

      </Paper>
    );
  } else {
    return (
      <Paper sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: 'url(https://source.unsplash.com/random/1600x900?technology)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.palette.common.white,
      }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', p: 4, borderRadius: theme.shape.borderRadius }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
            Welcome to TaskMaster
          </Typography>
          <Typography variant="h5" sx={{ my: 3, fontSize: '1.2rem' }}>
            A modern task management app built with the power of Node.js, Next.js, TypeScript, MongoDB, and secured with Auth0.
          </Typography>
          <Typography sx={{ my: 2 }}>
            TaskMaster lets you create, manage, and track your tasks efficiently. Sign in to start adding your tasks and experience productivity like never before!
          </Typography>
          <Box mt={4}>
            <Button variant="contained" color="primary" href="/api/auth/login">
              Sign In to Get Started
            </Button>
          </Box>

        </Container>
      </Paper>
    );
  }

}
