import React, { useState } from 'react';
import WebGLContainer from './WebGLContainer';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import './style.css';

const Main = () => {
  const [dimension, setDimension] = useState('3');

  const handleChange = (event: SelectChangeEvent) => {
      setDimension(event.target.value as string);
  };

  return (
      <div className='main-container'>
          <div className='header'>
              CubeGL
              <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                      <InputLabel sx={{ color: '#fff' }} id="demo-simple-select-label">Choose dimension</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={dimension}
                          label="Dimensiion"
                          onChange={handleChange}
                          sx={{ height: '36px', color: '#fff', marginLeft: '10px', border: 'none' }}
                      >
                          <MenuItem value={1}>2x2</MenuItem>
                          <MenuItem value={2}>4x4</MenuItem>
                          <MenuItem value={3}>6x6</MenuItem>
                          <MenuItem value={5}>10x10</MenuItem>
                      </Select>
                  </FormControl>
              </Box>
          </div>
          <WebGLContainer dimension={dimension} />
      </div>
  )
};

export default Main;
