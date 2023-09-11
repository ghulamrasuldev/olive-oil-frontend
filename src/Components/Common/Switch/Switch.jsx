import React from 'react';
import { Switch as MaterialUISwitch } from '@mui/material';
import './Switch.scss'

const Switch = () => {
  return (
    <MaterialUISwitch size='large'
    sx={{
        '& .MuiSwitch-thumb': {
        //   width: '1.5rem', // Adjust the thumb size
        //   height: '1.5rem', // Adjust the thumb size
          backgroundColor: '#90A67B', // Set thumb color when the switch is on
        },
        '& .MuiSwitch-track': {
        //   width: '3rem', // Adjust the track size
        //   height: '1rem', // Adjust the track size
          backgroundColor: '#90A67B', // Set track color when the switch is on
        },
      }}
    />
  );
};

export default Switch;