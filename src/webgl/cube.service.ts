import * as THREE from 'three';
import { BoxGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module';
// @ts-ignore
import cubeVertex from './shaders/cubeVertex.vert';
// @ts-ignore
import cubeFragment from './shaders/cubeFragment.frag';
import { defaultColors, defaultOpacity, getUpdatedOpacity } from "./utils";

export const cubeGL = (container: HTMLDivElement, dimension: number) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        container.offsetWidth / container.offsetHeight,
        0.1,
        1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();

    // Create a buffer attribute for the colors (for attribute vec3 vertexColor)
    const colorAttribute = new THREE.Float32BufferAttribute(
        new Float32Array(defaultColors), 3);

    // Create a buffer attribute for the opacity (for attribute vec2 vertexOpacity)
    const opacityAttribute = new THREE.Float32BufferAttribute(
        new Float32Array(defaultOpacity), 2);

    const geometry = new THREE.BufferGeometry().copy(new BoxGeometry(1,1,1));

    // Set attribute vertexColor in vertex shader
    geometry.setAttribute('vertexColor', colorAttribute);

    // Set attribute vertexOpacity in vertex shader
    geometry.setAttribute('vertexOpacity', opacityAttribute);

    // For instancedBufferGeometry when used
    //geometry.instanceCount = 6;

    const material = new THREE.ShaderMaterial({
        uniforms: {
          repeat: { value: dimension },
        },
        vertexShader: cubeVertex,
        fragmentShader: cubeFragment,
        side: THREE.DoubleSide,
        transparent: true
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const stats = Stats();
    document.body.appendChild(stats.dom);

    const raycastEnable = () => {
        const headerShiftAdjustment = 80;
        let intersected: any = [];

        const highlightFace = (intersectedObject?: any) => {
            const opacity = intersectedObject ? getUpdatedOpacity(intersectedObject.faceIndex) : defaultOpacity;

            const updatedOpacity = new THREE.Float32BufferAttribute(
                new Float32Array(opacity), 2);

            geometry.setAttribute('vertexOpacity', updatedOpacity);
            geometry.getAttribute('vertexOpacity').needsUpdate = true;

            //renderer.render(scene, camera);
        };

        const onRaycast = (e: any) => {
            const x = (e.clientX / container.offsetWidth ) * 2 - 1;
            const y = - ( (e.clientY - headerShiftAdjustment) / container.offsetHeight ) * 2 + 1;

            raycaster.setFromCamera({ x, y }, camera);
            const intersections: any = raycaster.intersectObjects(scene.children);

            // Check if current cube face (2 triangles) already selected
            if (intersections.length > 0) {
                if (intersections[0].faceIndex % 2 === 0) {
                    if (intersected[0] !== intersections[0].faceIndex || intersected[1] !== (intersections[0].faceIndex + 1)) {
                        highlightFace(intersections[0]);
                        intersected = [intersections[0].faceIndex, intersections[0].faceIndex + 1];
                    }
                } else {
                    if (intersected[0] !== (intersections[0].faceIndex - 1) || intersected[1] !== intersections[0].faceIndex) {
                        highlightFace(intersections[0]);
                        intersected = [intersections[0].faceIndex - 1, intersections[0].faceIndex];
                    }
                }
            } else {
                if (intersected.length > 0) {
                    highlightFace();
                }
                intersected = [];
            }
        };

        renderer.domElement.addEventListener('mousemove', onRaycast, false);
    };

    const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        render();

        stats.update();
    };

    const render = () => {
        renderer.render(scene, camera);
    };

    const resizeEnable = (container: any) => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        render();
    };

    const updateDimension = (dimension: number) => {
        cube.material.uniforms.repeat.value = dimension;
        render();
    };

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);

    return {
        animate, render, resizeEnable, raycastEnable, updateDimension
    }
};
