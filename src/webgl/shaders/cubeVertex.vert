attribute vec3 vertexColor;
attribute vec2 vertexOpacity;
varying vec3 vColor;
varying vec2 vOpacity;
varying vec2 vUv;

void main() {
    vUv = uv;
    vColor = vertexColor;
    vOpacity = vertexOpacity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}

