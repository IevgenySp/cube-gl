import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module';
import vertexShaderCode from './shaders/cube_vertex.glsl';

export const cubeGL = (container: HTMLDivElement) => {
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

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const stats = Stats();
    document.body.appendChild(stats.dom);

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

    const resize = (container: any) => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        render()
    };

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);

    return {
        animate, render, resize
    }
};
