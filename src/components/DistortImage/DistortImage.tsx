import { useEffect, useRef } from "react";
import "./DistortImage.css";

interface DistortImageProps {
  src: string;
  alt: string;
  className?: string;
}

const VERTEX_SRC = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform float uHover;
uniform float uTime;
uniform vec2 uCanvasSize;
uniform vec2 uTexSize;

vec2 coverUv(vec2 uv) {
  float canvasAspect = uCanvasSize.x / uCanvasSize.y;
  float texAspect = uTexSize.x / uTexSize.y;
  vec2 scale = vec2(1.0);
  if (canvasAspect > texAspect) {
    scale.y = texAspect / canvasAspect;
  } else {
    scale.x = canvasAspect / texAspect;
  }
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 uv = vUv;
  vec2 dir = uv - uMouse;
  float dist = length(dir);
  float radius = 0.4;
  float falloff = smoothstep(radius, 0.0, dist) * uHover;
  float ripple = sin(dist * 22.0 - uTime * 3.0) * 0.02;
  vec2 offset = dir * falloff * 0.35 + dir * ripple * falloff * 4.0;
  vec2 distortedUv = coverUv(uv - offset);

  float aberration = falloff * 0.012;
  float r = texture2D(uTexture, distortedUv + vec2(aberration, 0.0)).r;
  float g = texture2D(uTexture, distortedUv).g;
  float b = texture2D(uTexture, distortedUv - vec2(aberration, 0.0)).b;
  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function DistortImage({ src, alt, className }: DistortImageProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!container || !img || !canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: true });
    if (!gl) return;
    const glCanvas = canvas;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTexture = gl.getUniformLocation(program, "uTexture");
    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uHover = gl.getUniformLocation(program, "uHover");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uCanvasSize = gl.getUniformLocation(program, "uCanvasSize");
    const uTexSize = gl.getUniformLocation(program, "uTexSize");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let texSize: [number, number] = [1, 1];
    let textureReady = false;

    function uploadTexture() {
      if (!img || !gl) return;
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      texSize = [img.naturalWidth || 1, img.naturalHeight || 1];
      textureReady = true;
      container?.classList.add("distort-image--ready");
    }

    if (img.complete && img.naturalWidth > 0) {
      uploadTexture();
    } else {
      img.addEventListener("load", uploadTexture, { once: true });
    }

    const mouse = { x: 0.5, y: 0.5 };
    const hoverValue = { current: 0, target: 0 };
    let rafId: number | null = null;
    let time = 0;
    let running = false;

    function resize() {
      if (!canvas || !container || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render() {
      if (!gl) return;
      time += 0.016;
      hoverValue.current += (hoverValue.target - hoverValue.current) * 0.08;

      gl.useProgram(program);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(uTexture, 0);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uHover, hoverValue.current);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uCanvasSize, glCanvas.width, glCanvas.height);
      gl.uniform2f(uTexSize, texSize[0], texSize[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (hoverValue.target > 0 || hoverValue.current > 0.001) {
        rafId = requestAnimationFrame(render);
      } else {
        running = false;
        container?.classList.remove("distort-image--active");
      }
    }

    function startLoop() {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(render);
      }
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = 1 - (e.clientY - rect.top) / rect.height;
    }

    function handlePointerEnter(e: PointerEvent) {
      if (!textureReady) return;
      handlePointerMove(e);
      hoverValue.target = 1;
      container?.classList.add("distort-image--active");
      startLoop();
    }

    function handlePointerLeave() {
      hoverValue.target = 0;
      startLoop();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      img.removeEventListener("load", uploadTexture);
      resizeObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      gl.deleteTexture(texture);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [src]);

  return (
    <div ref={containerRef} className={`distort-image ${className ?? ""}`}>
      <img ref={imgRef} className="distort-image__img" src={src} alt={alt} loading="lazy" crossOrigin="anonymous" />
      <canvas ref={canvasRef} className="distort-image__canvas" />
    </div>
  );
}

export default DistortImage;
