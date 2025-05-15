import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProfile } from '../redux/profileSlice';
import { useNavigate } from 'react-router-dom';

const ProfileDisplay = () => {
  const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!profile) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>No profile found. Please create one.</Typography>
        <Button variant="contained" onClick={() => navigate('/profile-form')} sx={{ mt: 2 }}>
          Create Profile
        </Button>
      </Container>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      dispatch(deleteProfile());
      navigate('/profile-form');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Profile Details</Typography>
      <Typography>Name: {profile.name}</Typography>
      <Typography>Email: {profile.email}</Typography>
      <Typography>Age: {profile.age || "N/A"}</Typography>
      <Button variant="contained" onClick={() => navigate('/profile-form')} sx={{ mt: 2, mr: 2 }}>Edit</Button>
      <Button variant="outlined" color="error" onClick={handleDelete} sx={{ mt: 2 }}>Delete</Button>
    </Container>
  );
};

export default ProfileDisplay;
