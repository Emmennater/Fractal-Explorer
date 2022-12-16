function colToBin(r, g, b) {
    return ((b << 8) + g << 8) + r;
}







/* OLD */

var vertexShaderSrc = `
precision mediump float;

// Input variables
attribute vec2 vertPosition;
attribute vec3 vertColor;
attribute vec2 vertTexCoord;

// Output variables
varying vec3 fragColor;

void main() {
    fragColor = vertColor;
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}
`;

var fragmentShaderSrc = `
precision mediump float;

varying vec3 fragColor;

void main() {
    gl_FragColor = vec4(fragColor, 1.0);
}
`;

/*





























*/