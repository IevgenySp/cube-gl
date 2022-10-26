import React, { useRef, useEffect, useState } from 'react';
import { cubeGL } from "../webgl/cube.service";

const WebGLContainer: React.FC<{ dimension: string }> = ({ dimension }) => {
    const containerRef = useRef<any>();
    const [glService, setGlService] = useState<any>();
    let cGlService: any = null;
    let resizeHandler: any = null;

    useEffect(() => {
       if (containerRef.current) {
           if (cGlService === null) {
               cGlService = cubeGL(containerRef.current, Number(dimension));
               setGlService(cGlService);
               cGlService.raycastEnable();
               cGlService.animate();
               //cGlService.render();

               resizeHandler = () => {
                   cGlService.resizeEnable(containerRef.current);
               };

               window.addEventListener('resize', resizeHandler);
           }
       }
    }, []);

    useEffect(() => {
        if (glService) {
            glService.updateDimension(Number(dimension));
        }
    }, [dimension]);

    return (<div className='webGLContainer' ref={containerRef} />)
};

export default WebGLContainer;
