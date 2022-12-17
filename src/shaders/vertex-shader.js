var vtShaderSrc = glsl`

precision mediump float;

// Input variables
attribute vec2 vertPos;
attribute vec2 vertTex;

// Output variables
varying vec2 fragTex;

// Global constants
uniform mat3 u_matrix;

void main() {
  fragTex = vertTex;
  // Multiply the position by the matrix.
  // gl_Position = vec4((u_matrix * vec3(vertPos, 1)).xy, 0.0, 1.0);
  gl_Position = vec4(vertPos, 0.0, 1.0);
}

`;