precision highp float;

uniform float repeat;
varying vec3 vColor;
varying vec2 vOpacity;
varying vec2 vUv;

void main(void) {
    // Normalized pixel coordinates (from 0 to 1)
    vec2 st = vUv;
    // Moving the coordinate system to middle of screen
    st -= 0.5;

    float result = mod(dot(vec2(1.0), step(vec2(0.5), fract(st * repeat))), 2.0);

    gl_FragColor = mix(vec4(vColor, vOpacity.x), vec4(vColor, vOpacity.y), result);
}
