import React, { useState } from 'react';
import { TextField, Button, Container, Snackbar, Alert, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfile } from '../redux/profileSlice';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const existing = useSelector((state) => state.profile.profile);
  const [formData, setFormData] = useState(existing || { name: '', email: '', age: '' });
  const [message, setMessage] = useState({ open: false, type: 'success', text: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || formData.name.length < 3) {
      setMessage({ open: true, type: 'error', text: 'Name must be at least 3 characters.' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage({ open: true, type: 'error', text: 'Invalid email format.' });
      return;
    }
    if (formData.age && isNaN(formData.age)) {
      setMessage({ open: true, type: 'error', text: 'Age must be a number.' });
      return;
    }

    dispatch(saveProfile(formData));
    setMessage({ open: true, type: 'success', text: 'Profile saved successfully!' });
    navigate('/profile');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
         background: 'linear-gradient(135deg, #9D50BB 0%, #6E48AA 50%, #E96443 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 3,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          p: 4,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#222' }}>
          Update Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            sx={{ input: { color: '#333' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            sx={{ input: { color: '#333' } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            sx={{ input: { color: '#333' } }}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}>
            Save
          </Button>
        </form>
        <Snackbar
          open={message.open}
          autoHideDuration={3000}
          onClose={() => setMessage({ ...message, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={message.type} sx={{ width: '100%' }}>
            {message.text}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ProfileForm;
