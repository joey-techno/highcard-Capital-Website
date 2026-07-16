/* High Card Capital — WebGL hover displacement for .photo-card.gl images.
   Hand-rolled, no dependencies. Desktop fine-pointer only; falls back to the
   plain <img> everywhere else. One shared program; canvases render on demand. */
(function () {
  'use strict';
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const VERT = `
    attribute vec2 p;
    varying vec2 vUv;
    void main(){ vUv = p * .5 + .5; vUv.y = 1. - vUv.y; gl_Position = vec4(p, 0., 1.); }`;

  const FRAG = `
    precision mediump float;
    varying vec2 vUv;
    uniform sampler2D tex;
    uniform vec2 mouse;      // 0..1
    uniform float hover;     // eased 0..1
    uniform float time;
    uniform vec2 ratio;      // cover-fit correction
    void main(){
      vec2 uv = (vUv - .5) * ratio + .5;
      vec2 d = uv - mouse;
      float dist = length(d);
      // soft ripple radiating from the cursor, damped by distance
      float wave = sin(dist * 26. - time * 3.2) * .012;
      float damp = exp(-dist * 5.5) * hover;
      vec2 off = normalize(d + .0001) * wave * damp;
      // slight lens zoom toward cursor
      vec2 zoom = d * -.05 * damp;
      vec2 fuv = uv + off + zoom;
      // subtle chromatic split on the ripple
      float ca = .0035 * damp;
      vec4 c;
      c.r = texture2D(tex, fuv + vec2(ca, 0.)).r;
      c.g = texture2D(tex, fuv).g;
      c.b = texture2D(tex, fuv - vec2(ca, 0.)).b;
      c.a = 1.;
      gl_FragColor = c;
    }`;

  function initOne(fig) {
    const img = fig.querySelector('img');
    if (!img) return;
    const start = () => setup(fig, img);
    if (img.complete && img.naturalWidth) start();
    else img.addEventListener('load', start, { once: true });
  }

  function setup(fig, img) {
    const canvas = document.createElement('canvas');
    canvas.className = 'gl-canvas';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity .35s ease;pointer-events:none;';
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;
    fig.style.position = 'relative';
    fig.appendChild(canvas);

    const prog = gl.createProgram();
    [[gl.VERTEX_SHADER, VERT], [gl.FRAGMENT_SHADER, FRAG]].forEach(([type, src]) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s); gl.attachShader(prog, s);
    });
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);

    const U = n => gl.getUniformLocation(prog, n);
    const uMouse = U('mouse'), uHover = U('hover'), uTime = U('time'), uRatio = U('ratio');

    let hover = 0, target = 0, mx = 0.5, my = 0.5, raf = null, t0 = performance.now();

    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      const w = fig.clientWidth, h = fig.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      // cover-fit ratio (image aspect vs element aspect)
      const ia = img.naturalWidth / img.naturalHeight, ea = w / h;
      gl.uniform2f(uRatio, ea > ia ? 1 : ea / ia, ea > ia ? ia / ea : 1);
    }

    function frame() {
      hover += (target - hover) * 0.08;
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uHover, hover);
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (hover > 0.004 || target > 0) raf = requestAnimationFrame(frame);
      else { raf = null; canvas.style.opacity = '0'; }
    }

    fig.addEventListener('pointerenter', () => {
      resize();
      target = 1; canvas.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(frame);
    });
    fig.addEventListener('pointerleave', () => { target = 0; });
    fig.addEventListener('pointermove', ev => {
      const r = fig.getBoundingClientRect();
      mx = (ev.clientX - r.left) / r.width;
      my = (ev.clientY - r.top) / r.height;
    });
  }

  document.querySelectorAll('.photo-card.gl').forEach(initOne);
})();
