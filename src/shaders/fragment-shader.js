var fgShaderSrc = glsl`

precision mediump float;
precision highp int;
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
uniform bool domandel;

const float K = 4.0;
const float PI = 3.14159265358;
const vec3 cols = 1.0 / log(2.0) * vec3(1.0, 1.0 / (3.0 * sqrt(2.0)), 1.0 / (7.0 * pow(3.0, 1.0 / 8.0)));

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

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float hue(float v, int shift) {
  return float(modulo(int(v * 255.0) + shift, 255)) / 255.0;
}

vec3 g(float x) {
  float r = (1.0 - cos(x * cols.x / 2.0)) / 2.0;
  float g = (1.0 - cos(x * cols.y / 2.0)) / 2.0;
  float b = (1.0 - cos(x * cols.z / 2.0)) / 2.0;
  vec3 hsv = rgb2hsv(vec3(r, g, b));
  hsv.x += float(hsboff) / 255.0;
  return hsv2rgb(hsv);
}

vec3 mandelbrot(float x, float y) {

  // const int iterations = 500;

  //Ignore These
  float xOff = -(0.5 + xoff / zoom);
  float yOff = -(0.5 + yoff / zoom);

  float a = (y + xOff) * zoom * aspect;
  float b = (x + yOff) * zoom;
  float ca = a;
  float cb = b;

  for (int n=0; n<1000; n++) {
    if (n == iterations) {
      break;
    }
    
    float d = sqrt(a*a + b*b);

    if (d > 4.0) {
      // float V = log(d) / K; // npow
      // float V = d;
      float V = log(d) / pow(2.0, float(modulo(n, 73))); // change d to a or b for crazy
      float x = log(V) / log(2.0) * range;
      return g(x);
      // return vec3(d, d, d);
    }

    float aa = a*a - b*b;
    float bb = 2.0 * a * b;
    
    if (domandel) {
      a = aa + ca;
      b = bb + cb;
    } else {
      a = aa + consta;
      b = bb + constb;
    }
  }

  // float a2 = a;
  // float b2 = b;
  
  // if (d > 4.0) {
  //   float V = log(d) / npow;
  //   break;
  // }

  // float aa2 = a2*a2 - b2*b2;
  // float bb2 = 2.0 * a2 * b2;

  // float aa = b * b + b * a;
  // float bb = b * b - 1.0 * a;

  // a = aa + ca;
  // b = bb + cb;
  // a2 = aa2 + consta;
  // b2 = bb2 + constb;

  // float d2 = abs(a2*a2 + b2*b2);

  // Color function
  // float l = map(float(n), 0.0, float(iterations), 0.0, 1.0);
  // float l = 0.0;
  // if (n != iterations) {
  //   l = float(n) / float(iterations);
  // }
  
  // return colorize(l);

  // float L = (sin(l) + 1.0) * range;
  // return hsv2rgb(vec3(
  //   float(modulo(int(L * 255.0) + hsboff, 255)) / 255.0,
  //   180.0 / 255.0,
  //   l * 2.0
  // ));

  // return hsv2rgb(vec3(
  //   float(modulo(int(l * 255.0) + hsboff, 255)) / 255.0,
  //   180.0 / 255.0,
  //   l * 2.0
  // ));

  return vec3(0.0, 0.0, 0.0);
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
