attribute vec3 vertexColor;
varying vec3 vColor;

void main() {
    vColor = vertexColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}
