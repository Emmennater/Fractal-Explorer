var fgShaderSrc = `

precision mediump float;
// precision highp float;

varying vec2 fragTex;

uniform float xoff;
uniform float yoff;
uniform float zoom;
uniform float consta;
uniform float constb;
uniform float aspect;
uniform int hsboff;
uniform int iterations;
uniform float range;

int modulo(int num, int divisor) {
    return (num - divisor * (num / divisor));
}

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

vec3 binToCol(int bin) {
  int r = modulo(bin, 256);
  int g = modulo((bin / 256), 256);
  return vec3(r, g, bin / (256 * 256));
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 mandelbrot(float x, float y) {

  // const int iterations = 500;

  //Ignore These
  float xOff = -(0.5 + xoff / zoom);
  float yOff = -(0.5 + yoff / zoom);

  // xOff = -0.5;
  // yOff = -0.5;
  float a = (y + xOff) * zoom * aspect;
  float b = (x + yOff) * zoom;
  float ca = a;
  float cb = b;
  float a2 = a;
  float b2 = b;
  int n = 0;

  for (int i=0; i<1000; i++) {
    if (i == iterations) {
      break;
    }

    float aa = a*a - b*b;
    float bb = 2.0 * a * b;
    // float aa2 = a2*a2 - b2*b2;
    // float bb2 = 2.0 * a2 * b2;

    // float aa = b * b + b * a;
    // float bb = b * b - 1.0 * a;

    // a = aa + ca;
    // b = bb + cb;
    // a2 = aa2 + consta;
    // b2 = bb2 + constb;

    a = aa + consta;
    b = bb + constb;

    float d = abs(a*a + b*b);
    // float d2 = abs(a2*a2 + b2*b2);
    if (d > 4.0) {
        break;
    }

    n++;
  }

  float l = map(float(n), 0.0, float(iterations), 0.0, 1.0);
  if (n == iterations) {
      l = 0.0;
  }

  float L = (sin(l) + 1.0) * range;
  return hsv2rgb(vec3(
    float(modulo(int(L * 255.0) + hsboff, 255)) / 255.0,
    180.0 / 255.0,
    l * 2.0
  ));

  // return hsv2rgb(vec3(
  //   float(modulo(int(l * 255.0) + hsboff, 255)) / 255.0,
  //   180.0 / 255.0,
  //   l * 2.0
  // ));
}

void main() {

  float x = fragTex.t;
  float y = fragTex.s;

  vec3 c = mandelbrot(x, y);
  gl_FragColor = vec4(c, 1);

}

`;

/*



























*/
