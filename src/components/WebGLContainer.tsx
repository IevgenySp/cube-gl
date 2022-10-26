import React, { useRef, useEffect } from 'react';
import { cubeGL } from "../webgl/cube.service";

const WebGLContainer: React.FC<{ dimension: string }> = ({ dimension }) => {
    const containerRef = useRef<any>();
    let cGlService = useRef<any>();
    let resizeHandler: any = useRef<any>();

    useEffect(() => {
       if (containerRef.current) {
           if (!cGlService.current) {
               cGlService.current = cubeGL(containerRef.current, Number(dimension));
               cGlService.current.raycastEnable();
               cGlService.current.animate();
               //cGlService.render();

               resizeHandler.current = () => {
                   cGlService.current.resizeEnable(containerRef.current);
               };

               window.addEventListener('resize', resizeHandler.current);
           }
       }
    }, [dimension]);

    useEffect(() => {
        cGlService.current.updateDimension(Number(dimension));
    }, [dimension]);

    return (<div className='webGLContainer' ref={containerRef} />)
};

export default WebGLContainer;
