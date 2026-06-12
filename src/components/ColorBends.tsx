'use client'

import { useEffect, useRef, useState } from 'react'

const MAX_COLORS = 8

const FRAG = `
precision highp float;
#define MAX_COLORS 8
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
    q += (rr - q) * 0.15;
  }

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  }

  col *= uIntensity;

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = col;
  gl_FragColor = vec4(rgb, a);
}
`

const VERT = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '').trim()
  const v =
    h.length === 3
      ? [
          parseInt(h[0] + h[0], 16),
          parseInt(h[1] + h[1], 16),
          parseInt(h[2] + h[2], 16),
        ]
      : [
          parseInt(h.slice(0, 2), 16),
          parseInt(h.slice(2, 4), 16),
          parseInt(h.slice(4, 6), 16),
        ]
  return [v[0] / 255, v[1] / 255, v[2] / 255]
}

interface ColorBendsConfig {
  colors: string[]
  speed: number
  intensity: number
  noise: number
  warpStrength: number
  mouseInfluence: number
  parallax: number
  bandWidth: number
  rotation: number
  transparent: boolean
  scale?: number
  frequency?: number
  iterations?: number
  autoRotate?: number
}

interface DisposeHandle {
  dispose: () => void
  update: (patch: Partial<ColorBendsConfig>) => void
}

function initColorBends(canvas: HTMLCanvasElement, opts: ColorBendsConfig): DisposeHandle {
  const {
    rotation = 90,
    speed = 0.18,
    colors = [],
    transparent = false,
    autoRotate = 0,
    scale = 1,
    frequency = 1,
    warpStrength = 1.2,
    mouseInfluence = 0.8,
    parallax = 0.4,
    noise = 0.12,
    iterations = 1,
    intensity = 1.3,
    bandWidth = 5,
  } = opts

  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: true,
    premultipliedAlpha: true,
  })
  if (!gl) return { dispose() {}, update() {} }

  function compile(type: number, src: string): WebGLShader {
    const sh = gl!.createShader(type)!
    gl!.shaderSource(sh, src)
    gl!.compileShader(sh)
    if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
      console.error(gl!.getShaderInfoLog(sh))
    }
    return sh
  }

  const prog = gl.createProgram()!
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('ColorBends shader link failed:', gl.getProgramInfoLog(prog))
    gl.deleteProgram(prog)
    return { dispose() {}, update() {} }
  }
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  )
  const posLoc = gl.getAttribLocation(prog, 'position')
  gl.enableVertexAttribArray(posLoc)
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

  function U(name: string): WebGLUniformLocation | null {
    return gl!.getUniformLocation(prog, name)
  }

  const uCanvas = U('uCanvas')
  const uTime = U('uTime')
  const uRot = U('uRot')
  const uPointer = U('uPointer')

  gl.uniform1f(U('uSpeed'), speed)
  gl.uniform1i(U('uTransparent'), transparent ? 1 : 0)
  gl.uniform1f(U('uScale'), scale)
  gl.uniform1f(U('uFrequency'), frequency)
  gl.uniform1f(U('uWarpStrength'), warpStrength)
  gl.uniform1f(U('uMouseInfluence'), mouseInfluence)
  gl.uniform1f(U('uParallax'), parallax)
  gl.uniform1f(U('uNoise'), noise)
  gl.uniform1i(U('uIterations'), iterations)
  gl.uniform1f(U('uIntensity'), intensity)
  gl.uniform1f(U('uBandWidth'), bandWidth)

  const colorArr = colors
    .filter(Boolean)
    .slice(0, MAX_COLORS)
    .map(hexToRgb)
  const flat = new Float32Array(MAX_COLORS * 3)
  colorArr.forEach((c, i) => flat.set(c, i * 3))
  gl.uniform3fv(U('uColors'), flat)
  gl.uniform1i(U('uColorCount'), colorArr.length)

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = canvas.parentElement?.clientWidth || window.innerWidth || 1
    const h = canvas.parentElement?.clientHeight || window.innerHeight || 1
    canvas.width = w * dpr
    canvas.height = h * dpr
    gl!.viewport(0, 0, canvas.width, canvas.height)
    gl!.uniform2f(uCanvas, w, h)
  }

  resize()

  const ro = new ResizeObserver(resize)
  ro.observe(canvas.parentElement ?? document.documentElement)

  const ptrTarget: [number, number] = [0, 0]
  const ptrCur: [number, number] = [0, 0]

  function onMove(e: PointerEvent) {
    ptrTarget[0] = (e.clientX / (window.innerWidth || 1)) * 2 - 1
    ptrTarget[1] = -((e.clientY / (window.innerHeight || 1)) * 2 - 1)
  }

  window.addEventListener('pointermove', onMove)

  let rafId: number | null = null
  let running = true
  let last = performance.now()
  let elapsed = 0
  let rot = rotation
  let autoRot = autoRotate

  function loop(now: number) {
    if (!running) return
    const dt = (now - last) / 1000
    last = now
    elapsed += dt

    gl!.uniform1f(uTime, elapsed)

    const deg = (rot % 360) + autoRot * elapsed
    const rad = (deg * Math.PI) / 180
    gl!.uniform2f(uRot, Math.cos(rad), Math.sin(rad))

    const amt = Math.min(1, dt * 8)
    ptrCur[0] += (ptrTarget[0] - ptrCur[0]) * amt
    ptrCur[1] += (ptrTarget[1] - ptrCur[1]) * amt
    gl!.uniform2f(uPointer, ptrCur[0], ptrCur[1])

    gl!.clearColor(0, 0, 0, transparent ? 0 : 1)
    gl!.clear(gl!.COLOR_BUFFER_BIT)
    gl!.drawArrays(gl!.TRIANGLES, 0, 3)

    rafId = requestAnimationFrame(loop)
  }

  rafId = requestAnimationFrame(loop)

  return {
    update(patch) {
      if (patch.rotation !== undefined) rot = patch.rotation
      if (patch.autoRotate !== undefined) autoRot = patch.autoRotate
      if (patch.speed !== undefined) gl!.uniform1f(U('uSpeed'), patch.speed)
      if (patch.scale !== undefined) gl!.uniform1f(U('uScale'), patch.scale)
      if (patch.frequency !== undefined) gl!.uniform1f(U('uFrequency'), patch.frequency)
      if (patch.warpStrength !== undefined) gl!.uniform1f(U('uWarpStrength'), patch.warpStrength)
      if (patch.mouseInfluence !== undefined) gl!.uniform1f(U('uMouseInfluence'), patch.mouseInfluence)
      if (patch.parallax !== undefined) gl!.uniform1f(U('uParallax'), patch.parallax)
      if (patch.noise !== undefined) gl!.uniform1f(U('uNoise'), patch.noise)
      if (patch.iterations !== undefined) gl!.uniform1i(U('uIterations'), Math.round(patch.iterations))
      if (patch.intensity !== undefined) gl!.uniform1f(U('uIntensity'), patch.intensity)
      if (patch.bandWidth !== undefined) gl!.uniform1f(U('uBandWidth'), patch.bandWidth)
    },
    dispose() {
      running = false
      if (rafId !== null) cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      gl.deleteProgram(prog)
      if (buf) gl.deleteBuffer(buf)
    },
  }
}

const CONFIG: ColorBendsConfig = {
  colors: ['#ea1515', '#C1121F', '#4A0E14'],
  rotation: 47,
  autoRotate: 0,
  speed: 0.26,
  scale: 0.4,
  frequency: 1.2,
  warpStrength: 0.9,
  mouseInfluence: 1,
  parallax: 2,
  noise: 0.15,
  iterations: 2,
  intensity: 1.1,
  bandWidth: 6,
  transparent: true,
}

const SLIDERS: Array<{ key: string; min: number; max: number; step: number }> = [
  { key: 'scale', min: 0.2, max: 2, step: 0.05 },
  { key: 'frequency', min: 0.2, max: 3, step: 0.05 },
  { key: 'rotation', min: 0, max: 360, step: 1 },
  { key: 'speed', min: 0, max: 1, step: 0.01 },
  { key: 'warpStrength', min: 0, max: 3, step: 0.05 },
  { key: 'bandWidth', min: 1, max: 12, step: 0.5 },
  { key: 'intensity', min: 0.2, max: 3, step: 0.05 },
  { key: 'noise', min: 0, max: 0.5, step: 0.01 },
  { key: 'iterations', min: 1, max: 5, step: 1 },
  { key: 'parallax', min: 0, max: 2, step: 0.05 },
  { key: 'mouseInfluence', min: 0, max: 2, step: 0.05 },
]

function TweakPanel({ onChange }: { onChange: (patch: Partial<ColorBendsConfig>) => void }) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const v: Record<string, number> = {}
    for (const s of SLIDERS) v[s.key] = (CONFIG as unknown as Record<string, number>)[s.key]
    return v
  })
  const [open, setOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  function set(key: string, raw: string) {
    const v = Number(raw)
    setValues((prev) => ({ ...prev, [key]: v }))
    onChange({ [key]: v })
  }

  function copyConfig() {
    const cfg = { ...CONFIG, ...values }
    navigator.clipboard.writeText(JSON.stringify(cfg, null, 2)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: 12,
        bottom: 12,
        zIndex: 9999,
        width: 240,
        padding: '10px 12px',
        background: 'rgba(10, 10, 12, 0.92)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: 8,
        fontFamily: 'monospace',
        fontSize: 11,
        color: '#ddd',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: open ? 8 : 0 }}>
        <strong>ColorBends tweaks</strong>
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
          {open ? '−' : '+'}
        </button>
      </div>
      {open && (
        <>
          {SLIDERS.map((s) => (
            <label key={s.key} style={{ display: 'block', marginBottom: 6 }}>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                {s.key}
                <span style={{ color: '#ea1515' }}>{values[s.key]}</span>
              </span>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={values[s.key]}
                onChange={(e) => set(s.key, e.target.value)}
                style={{ width: '100%' }}
              />
            </label>
          ))}
          <button
            onClick={copyConfig}
            style={{
              width: '100%',
              marginTop: 4,
              padding: '5px 0',
              background: copied ? '#1a7f37' : '#ea1515',
              border: 'none',
              borderRadius: 4,
              color: '#fff',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            {copied ? 'copied!' : 'copy config'}
          </button>
        </>
      )}
    </div>
  )
}

export default function ColorBends() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleRef = useRef<DisposeHandle | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const handle = initColorBends(canvas, CONFIG)
    handleRef.current = handle
    return () => {
      handle.dispose()
      handleRef.current = null
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, oklch(0% 0 0 / 30%), transparent 30%, transparent 75%, oklch(0% 0 0 / 35%)), radial-gradient(ellipse 70% 60% at 28% 42%, oklch(0% 0 0 / 38%), transparent 70%)',
        }}
      />
      {process.env.NODE_ENV === 'development' && (
        <TweakPanel onChange={(patch) => handleRef.current?.update(patch)} />
      )}
    </>
  )
}
