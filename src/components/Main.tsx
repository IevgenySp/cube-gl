import React from 'react';
import WebGLContainer from './WebGLContainer';

import './style.css';

const Main = () => {
  return (
      <div className='main-container'>
          <div className='header'>CubeGL</div>
          <WebGLContainer />
      </div>
  )
};

export default Main;
