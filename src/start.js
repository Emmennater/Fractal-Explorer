
function setup() {
  
  CANVAS = null;
  // data = {xoff:0.364, yoff:-0.1, zoom:3.0, consta:0.5, constb:0.5};
  // data = {
  //   xoff: 0.0,
  //   yoff: 0.0,
  //   zoom: 3.0,
  //   consta: 0.3375,
  //   constb: 0.38125
  // };
  
  data = {
    xoff: 0,
    yoff: 0,
    zoom: 2,
    consta: -0.6975,
    constb: 0.275,
    hsboff: 100,
    iterations: 500
  };

  data.test = 0;
    
  setupElements();

  // Initializing webgl
  let webgl = setupWebgl(vtShaderSrc, fgShaderSrc);
  gl = webgl.gl;
  program = webgl.program;
  
  // Create buffer to store and render objects
  objbuffer = new Buffer(gl, program);
  
  // Add attributes
  objbuffer.addAttribute("vertPos", 2);
  objbuffer.addAttribute("vertTex", 2);
  
  // Setup buffer with these attributes
  objbuffer.saveAttribLocations();
  
  // Create a new shape with vertices: [x, y, tx, ty, tl, tr, br, bl]
  tri0 = new GLShape(objbuffer, 4);
  
  // Add attributes
  tri0.getVertex(0).attribs = [-1.0, -1.0,   0, 0];
  tri0.getVertex(1).attribs = [+1.0, -1.0,   1, 0];
  tri0.getVertex(2).attribs = [+1.0, +1.0,   1, 1];
  tri0.getVertex(3).attribs = [-1.0, +1.0,   0, 1];
  
  // Add triangle vertices to object buffer arrays
  tri0.appendAttribs();
  
  // Tell the buffer to load the new vertices
  objbuffer.loadVertices();
  
  //  Setup uniforms
  data.xoffUniform = gl.getUniformLocation(program, "xoff");
  data.yoffUniform = gl.getUniformLocation(program, "yoff");
  data.zoomUniform = gl.getUniformLocation(program, "zoom");
  data.constaUniform = gl.getUniformLocation(program, "consta");
  data.constbUniform = gl.getUniformLocation(program, "constb");
  data.aspectUniform = gl.getUniformLocation(program, "aspect");
  data.matrixUniform = gl.getUniformLocation(program, "u_matrix");
  data.hsboffUniform = gl.getUniformLocation(program, "hsboff");
  data.iterationsUniform = gl.getUniformLocation(program, "iterations");
  updateAspectRatio();
  
  requestAnimationFrame(()=>animate(gl, program));
}

function animate(gl, program) {
  
  runKeys();
  updateData();
  updateUniforms(gl, program);

  gl.viewport(0, 0, WIDTH, HEIGHT);

  // Clear background
  gl.clearColor(0, 0, 0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Compute the matrices
  var projectionMatrix = m3.projection(WIDTH, HEIGHT);

  // Set the matrix
  gl.uniformMatrix3fv(data.matrixUniform, false, projectionMatrix);

  // Render objects
  objbuffer.render();
  
  requestAnimationFrame(()=>animate(gl, program));
}

function updateUniforms(gl, program) {
  gl.uniform1f(data.xoffUniform, data.xoff);
  gl.uniform1f(data.yoffUniform, data.yoff);
  gl.uniform1f(data.zoomUniform, data.zoom);
  gl.uniform1f(data.constaUniform, data.consta);
  gl.uniform1f(data.constbUniform, data.constb);
  gl.uniform1i(data.hsboffUniform, data.hsboff);
  gl.uniform1i(data.iterationsUniform, data.iterations);
}

function updateAspectRatio() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  CANVAS.width = WIDTH;
  CANVAS.height = HEIGHT;
  gl.uniform1f(data.aspectUniform, WIDTH / HEIGHT);
}

/*



























*/
