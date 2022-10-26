import React, { useRef, useEffect, useState } from 'react';
import { cubeGL } from "../webgl/cube.service";

const WebGLContainer = () => {
    const containerRef = useRef<any>();
    let cGlService: any = null;

    useEffect(() => {
       if (containerRef.current) {
           if (cGlService === null) {
               cGlService = cubeGL(containerRef.current);
               //cGlService.animate();
               cGlService.render();
           }
       }
    }, []);

    return (<div className='webGLContainer' ref={containerRef} />)
};

export default WebGLContainer;
