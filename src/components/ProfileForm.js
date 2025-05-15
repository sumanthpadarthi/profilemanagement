import React, { useState } from 'react';
import { TextField, Button, Container, Snackbar, Alert } from '@mui/material';
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <TextField fullWidth margin="normal" label="Email" value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <TextField fullWidth margin="normal" label="Age" value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Save</Button>
      </form>
      <Snackbar open={message.open} autoHideDuration={3000} onClose={() => setMessage({ ...message, open: false })}>
        <Alert severity={message.type}>{message.text}</Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfileForm;
