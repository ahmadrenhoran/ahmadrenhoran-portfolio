<template>
  <canvas ref="canvasRef" id="three-canvas" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useColorMode } from '#imports'
import { gsap } from 'gsap'

const props = defineProps<{
  currentSection: number
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const colorMode = useColorMode()

let animationId: number
let renderer: any, scene: any, camera: any, THREE: any
let group: any
let faceCloud: any   // sphere shell particles
let featCloud: any   // face feature particles

let targetRotation = { x: 0, y: 0 }
let currentRotation = { x: 0, y: 0 }
let mouseX = 0
let mouseY = 0

const emotions = ['happy', 'sad', 'angry', 'dizzy', 'laugh', 'cool']
let currentEmotionIndex = 0

// --- GANTI DISINI: Nilai ditingkatkan drastis untuk gaya Point Cloud padat ---
const NUM_FACE = 50000   // cangkang bola (sebelumnya 700)
const NUM_FEAT = 20000   // fitur wajah (sebelumnya 500)

let faceTargetPos: Float32Array
let featTargetPos: Float32Array
let featTargetCol: Float32Array  // per-particle RGB for features
let faceJitter: Float32Array
let featJitter: Float32Array

// ---------- helpers ----------

// --- BARU: Fungsi untuk membuat tekstur dot halus secara terprogram ---
function createSoftParticleTexture(T: any) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Create radial gradient: putih di tengah, transparan di pinggir
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Pusat solid
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.5)'); // Blur halus
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparan total

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new T.CanvasTexture(canvas);
  return texture;
}

function arc2(n: number, cx: number, cy: number, r: number, a0: number, a1: number) {
  const pts: number[][] = []
  for (let i = 0; i < n; i++) {
    const a = a0 + (i / Math.max(1, n - 1)) * (a1 - a0)
    // Tambikit noise sedikit agar tidak terlalu kaku garisnya
    const sR = r + (Math.random() - 0.5) * 0.01 
    pts.push([cx + sR * Math.cos(a), cy + sR * Math.sin(a)])
  }
  return pts
}
function circ2(n: number, cx: number, cy: number, r: number) {
  return arc2(n, cx, cy, r, 0, Math.PI * 2)
}
function disk2(n: number, cx: number, cy: number, r: number) {
  const pts: number[][] = []
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2
    // sqrt distribution agar merata di area disk
    const d = Math.sqrt(Math.random()) * r 
    pts.push([cx + d * Math.cos(a), cy + d * Math.sin(a)])
  }
  return pts
}
function line2(n: number, x1: number, y1: number, x2: number, y2: number) {
  const pts: number[][] = []
  for (let i = 0; i < n; i++) {
    const t = i / Math.max(1, n - 1)
    pts.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t])
  }
  return pts
}

// Map 2-D face coord [-1,1] onto sphere surface
function f2s(fx: number, fy: number, R: number, zPush = 0.0): [number, number, number] {
  const lon = fx * 0.85   
  const lat = fy * 0.70
  // Tambahkan sedikit noise z acak agar point cloud memiliki kedalaman halus
  const depthNoise = (Math.random() - 0.5) * 0.02;
  return [
    R * Math.cos(lat) * Math.sin(lon),
    R * Math.sin(lat),
    R * Math.cos(lat) * Math.cos(lon) + zPush + depthNoise
  ]
}

// ---------- sphere shell (fibonacci distribution) ----------
function buildShell(R: number) {
  const pts: Float32Array = new Float32Array(NUM_FACE * 3)
  for (let i = 0; i < NUM_FACE; i++) {
    const y = 1 - (i / (NUM_FACE - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = i * 2.39996323 // golden angle
    pts[i * 3]     = R * r * Math.cos(theta)
    pts[i * 3 + 1] = R * y
    pts[i * 3 + 2] = R * r * Math.sin(theta)
  }
  return pts
}

// ---------- face features ----------
function buildFeatureTargets(emotion: string) {
  const R = 1.12       
  const PUSH = 0.08    // Pintu fitur sedikit lebih maju agar jela

  // Colors as [r,g,b] 0-1
  const COL = {
    orange: [1.0, 0.47, 0.12],
    white:  [1.0, 1.0,  1.0 ],
    blue:   [0.24, 0.65, 1.0],
    pink:   [1.0, 0.46, 0.66],
    red:    [1.0, 0.20, 0.20],
    dark:   [0.08, 0.10, 0.25], // Sedikit lebih terang agar additive blending terlihat
    cyan:   [0.24, 0.90, 1.0],
    amber:  [1.0, 0.72, 0.10],
  }

  type Seg = { pts: number[][], col: number[] }
  const segs: Seg[] = []

  const add = (pts2d: number[][], col: number[]) => segs.push({ pts: pts2d, col })

  // --- Kepadatan di helpers ditingkatkan drastis untuk mengisi NUM_FEAT ---

  if (emotion === 'happy') {
    // brows
    add(arc2(1000, -0.44, 0.52, 0.20, Math.PI * 1.1, Math.PI * 1.9), COL.orange)
    add(arc2(1000,  0.44, 0.52, 0.20, Math.PI * 1.1, Math.PI * 1.9), COL.orange)
    // eyes
    add(disk2(2500, -0.44, 0.18, 0.24), COL.white)
    add(disk2(600, -0.44, 0.18, 0.11), COL.dark)
    add(disk2(2500,  0.44, 0.18, 0.24), COL.white)
    add(disk2(600,  0.44, 0.18, 0.11), COL.dark)
    // big smile
    add(arc2(4000,  0, -0.10, 0.55, 0, Math.PI), COL.orange)
    add(disk2(3500,  0, -0.14, 0.46), COL.white)
    add(line2(800, -0.40, -0.10, 0.40, -0.10), COL.red)
    // cheeks
    add(disk2(1500, -0.80, -0.08, 0.20), COL.pink)
    add(disk2(1500,  0.80, -0.08, 0.20), COL.pink)

  } else if (emotion === 'laugh') {
    // brows
    add(line2(1000, -0.62, 0.40, -0.20, 0.28), COL.orange)
    add(line2(1000,  0.62, 0.40,  0.20, 0.28), COL.orange)
    // squint eyes
    add(arc2(2500, -0.44, 0.18, 0.24, Math.PI, Math.PI * 2), COL.white)
    add(disk2(800, -0.44, 0.18, 0.15), COL.white)
    add(arc2(2500,  0.44, 0.18, 0.24, Math.PI, Math.PI * 2), COL.white)
    add(disk2(800,  0.44, 0.18, 0.15), COL.white)
    // tears
    add(line2(1200, -0.48, 0.06, -0.60, -0.38), COL.blue)
    add(disk2(800, -0.60, -0.40, 0.11), COL.blue)
    add(line2(1200,  0.48, 0.06,  0.60, -0.38), COL.blue)
    add(disk2(800,  0.60, -0.40, 0.11), COL.blue)
    // open mouth
    add(arc2(4000,  0, -0.20, 0.56, Math.PI * 0.98, Math.PI * 2.02), COL.orange)
    add(disk2(3500,  0, -0.22, 0.48), COL.white)
    add(line2(1000, -0.42, -0.20, 0.42, -0.20), COL.red)
    // cheeks
    add(disk2(1500, -0.82, -0.08, 0.18), COL.pink)
    add(disk2(1500,  0.82, -0.08, 0.18), COL.pink)

  } else if (emotion === 'sad') {
    add(line2(1000, -0.60, 0.28, -0.18, 0.46), COL.orange)
    add(line2(1000,  0.60, 0.28,  0.18, 0.46), COL.orange)
    add(disk2(3000, -0.44, 0.18, 0.24), COL.cyan)
    add(disk2(800, -0.44, 0.18, 0.12), [0.12, 0.38, 0.70])
    add(disk2(3000,  0.44, 0.18, 0.24), COL.cyan)
    add(disk2(800,  0.44, 0.18, 0.12), [0.12, 0.38, 0.70])
    // tears
    add(line2(2500, -0.44, 0.0, -0.52, -0.46), COL.blue)
    add(line2(2500,  0.44, 0.0,  0.52, -0.46), COL.blue)
    // frown
    add(arc2(5000,  0, -0.54, 0.42, 0, Math.PI), COL.orange)

  } else if (emotion === 'angry') {
    add(line2(1500, -0.64, 0.36, -0.16, 0.22), COL.orange)
    add(line2(1500,  0.64, 0.36,  0.16, 0.22), COL.orange)
    add(disk2(3000, -0.44, 0.16, 0.24), COL.red)
    add(disk2(800, -0.44, 0.16, 0.12), [0.55, 0.04, 0.04])
    add(disk2(3000,  0.44, 0.16, 0.24), COL.red)
    add(disk2(800,  0.44, 0.16, 0.12), [0.55, 0.04, 0.04])
    add(arc2(5000,  0, -0.52, 0.42, 0, Math.PI), COL.red)

  } else if (emotion === 'dizzy') {
    // X eyes
    add(line2(1500, -0.60, 0.08, -0.28, 0.40), COL.white)
    add(line2(1500, -0.28, 0.08, -0.60, 0.40), COL.white)
    add(line2(1500,  0.28, 0.08,  0.60, 0.40), COL.white)
    add(line2(1500,  0.60, 0.08,  0.28, 0.40), COL.white)
    // O mouth
    add(circ2(5000,  0, -0.36, 0.26), COL.orange)
    add(disk2(2000,  0, -0.36, 0.18), [0.25, 0.08, 0.08])
    // swirl
    add(arc2(2500,  0, 0.16, 0.14, 0, Math.PI * 2), COL.cyan)

  } else if (emotion === 'cool') {
    // sunglasses
    add(disk2(3000, -0.44, 0.18, 0.28), COL.dark)
    add(disk2(3000,  0.44, 0.18, 0.28), COL.dark)
    add(circ2(2000, -0.44, 0.18, 0.28), COL.amber)
    add(circ2(2000,  0.44, 0.18, 0.28), COL.amber)
    add(disk2(500,  -0.30, 0.27, 0.08), COL.white)  // glint
    add(disk2(500,   0.58, 0.27, 0.08), COL.white)
    add(line2(1000, -0.16, 0.18,  0.16, 0.18), COL.amber)
    add(line2(800, -0.72, 0.18, -0.44, 0.18), COL.amber)
    add(line2(800,  0.72, 0.18,  0.44, 0.18), COL.amber)
    // smirk
    add(arc2(4000,  0.12, -0.28, 0.36, Math.PI, Math.PI * 2), COL.orange)
    add(disk2(1500, -0.80, -0.06, 0.17), COL.pink)
  }

  // Flatten into typed arrays
  const posArr = new Float32Array(NUM_FEAT * 3)
  const colArr = new Float32Array(NUM_FEAT * 3)

  let idx = 0
  for (const seg of segs) {
    for (const p of seg.pts) {
      if (idx >= NUM_FEAT) break
      const [x, y, z] = f2s(p[0], p[1], R, PUSH)
      posArr[idx * 3]     = x
      posArr[idx * 3 + 1] = y
      posArr[idx * 3 + 2] = z
      colArr[idx * 3]     = seg.col[0]
      colArr[idx * 3 + 1] = seg.col[1]
      colArr[idx * 3 + 2] = seg.col[2]
      idx++
    }
    if (idx >= NUM_FEAT) break
  }
  // fill remaining randomly on surface if not enough pts generated
  while (idx < NUM_FEAT) {
    const lat = (Math.random() - 0.5) * Math.PI * 0.8
    const lon = (Math.random() - 0.5) * Math.PI * 0.9
    posArr[idx * 3]     = R * Math.cos(lat) * Math.sin(lon)
    posArr[idx * 3 + 1] = R * Math.sin(lat)
    posArr[idx * 3 + 2] = R * Math.cos(lat) * Math.cos(lon)
    colArr[idx * 3]     = 1.0 // amber fallback
    colArr[idx * 3 + 1] = 0.72
    colArr[idx * 3 + 2] = 0.10
    idx++
  }

  return { posArr, colArr }
}

// ---------- init ----------
async function init() {
  if (!canvasRef.value) return
  THREE = await import('three')

  const canvas = canvasRef.value
  const W = window.innerWidth
  const H = window.innerHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 1000)
  camera.position.set(0, 0, 5)

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  group = new THREE.Group()
  scene.add(group)

  const R = 1.12

  // --- BARU: Buat satu tekstur dot halus untuk digunakan bersama ---
  const particleTexture = createSoftParticleTexture(THREE);

  // ---- face shell ----
  faceTargetPos = buildShell(R)
  faceJitter = new Float32Array(NUM_FACE * 3)
  for (let i = 0; i < NUM_FACE; i++) {
    // Noise gerakan cangkang dibuat sangat halus
    faceJitter[i * 3]     = (Math.random() - 0.5) * 0.04
    faceJitter[i * 3 + 1] = (Math.random() - 0.5) * 0.04
    faceJitter[i * 3 + 2] = (Math.random() - 0.5) * 0.02
  }

  const faceGeo = new THREE.BufferGeometry()
  // Init position di center agar morphing awal menyebar
  const facePosInit = new Float32Array(NUM_FACE * 3)
  faceGeo.setAttribute('position', new THREE.BufferAttribute(facePosInit, 3))

  // --- MODIFIKASI: Material Cangkang lebih halus dan bersinar ---
  faceCloud = new THREE.Points(faceGeo, new THREE.PointsMaterial({
    color: 0xffdc1e,
    size: 0.015,             // Ukuran dikecilkan karena jumlah point banyak
    map: particleTexture,    // Pakai tekstur halus
    transparent: true,
    opacity: 0.6,            // Lebih transparan agar tumpukan point cloud artistik
    blending: THREE.AdditiveBlending, // Efek bersinar saat bertumpuk
    depthWrite: false,       // Penting untuk transparansi tumpukan point
    sizeAttenuation: true,
  }))
  group.add(faceCloud)

  // ---- feature particles (per-vertex color) ----
  const { posArr: fpos, colArr: fcol } = buildFeatureTargets('happy')
  featTargetPos = fpos
  featTargetCol = fcol
  featJitter = new Float32Array(NUM_FEAT * 3)
  for (let i = 0; i < NUM_FEAT; i++) {
    featJitter[i * 3]     = (Math.random() - 0.5) * 0.02
    featJitter[i * 3 + 1] = (Math.random() - 0.5) * 0.02
    featJitter[i * 3 + 2] = (Math.random() - 0.5) * 0.01
  }

  const featGeo = new THREE.BufferGeometry()
  const featPosInit = new Float32Array(NUM_FEAT * 3)
  const featColInit = new Float32Array(NUM_FEAT * 3) 
  featGeo.setAttribute('position', new THREE.BufferAttribute(featPosInit, 3))
  featGeo.setAttribute('color',    new THREE.BufferAttribute(featColInit, 3))

  // --- MODIFIKASI: Material Fitur lebih padat, halus, dan glow ---
  featCloud = new THREE.Points(featGeo, new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.035,             // Sedikit lebih besar dari cangkang agar fitur tegas
    map: particleTexture,    // Pakai tekstur halus
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending, // Glow effect
    depthWrite: false,
    sizeAttenuation: true,
  }))
  group.add(featCloud)

  applySectionTransform(props.currentSection, true)
  animate()

  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('click', onClick)
}

// ---------- emotion update ----------
function setEmotion(emotion: string) {
  // Langsung generate target baru, loop animate akan handle lerp warnanya
  const { posArr, colArr } = buildFeatureTargets(emotion)
  featTargetPos = posArr
  featTargetCol = colArr
}

// ---------- interaction ----------
function onMouseMove(e: MouseEvent) {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1
  targetRotation.y = mouseX * 0.3
  targetRotation.x = -mouseY * 0.2
}

function onClick() {
  if (!group) return
  currentEmotionIndex = (currentEmotionIndex + 1) % emotions.length
  setEmotion(emotions[currentEmotionIndex])

  // Efek kaget sedikit saat klik
  gsap.to(group.scale, {
    x: group.scale.x * 1.05,
    y: group.scale.y * 1.05,
    z: group.scale.z * 1.05,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power2.out',
  })
}

// ---------- animation ----------
let clock: any

function animate() {
  if (!THREE) return
  if (!clock) clock = new THREE.Clock()
  animationId = requestAnimationFrame(animate)
  const time = clock.getElapsedTime()

  // rotation follow mouse damping
  currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05
  currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05
  group.rotation.x = currentRotation.x
  group.rotation.y = currentRotation.y

  // Kecepatan lerp (morphing)
  const morphSpeed = 0.06;
  const colorSpeed = 0.04;

  // ---- morph face shell (Damped Spring-like motion) ----
  if (faceCloud) {
    const pos = faceCloud.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < NUM_FACE; i++) {
      const ix = i * 3
      // Kebisingan gerakan kosmik yang sangat lambat dan halus
      const ns = 0.15; // noise scale
      const nt = time * 0.2; // noise time speed
      const jx = Math.sin(nt + i * ns) * 0.02 + faceJitter[ix]
      const jy = Math.cos(nt * 0.9 + i * ns * 1.1) * 0.02 + faceJitter[ix + 1]
      const jz = Math.sin(nt * 1.1 + i * ns * 0.8) * 0.01 + faceJitter[ix + 2]

      // LERP position
      pos[ix]     += (faceTargetPos[ix]     + jx - pos[ix])     * morphSpeed
      pos[ix + 1] += (faceTargetPos[ix + 1] + jy - pos[ix + 1]) * morphSpeed
      pos[ix + 2] += (faceTargetPos[ix + 2] + jz - pos[ix + 2]) * morphSpeed
    }
    faceCloud.geometry.attributes.position.needsUpdate = true
  }

  // ---- morph features position & color ----
  if (featCloud) {
    const pos = featCloud.geometry.attributes.position.array as Float32Array
    const col = featCloud.geometry.attributes.color.array as Float32Array
    for (let i = 0; i < NUM_FEAT; i++) {
      const ix = i * 3
      // Kebisingan gerakan fitur lebih cepat sedikit
      const nt = time * 1.0;
      const jx = Math.sin(nt + i * 0.5) * 0.01 + featJitter[ix]
      const jy = Math.cos(nt * 0.8 + i * 0.6) * 0.01 + featJitter[ix + 1]
      const jz = Math.sin(nt * 1.2 + i * 0.4) * 0.005 + featJitter[ix + 2]

      // LERP position
      pos[ix]     += (featTargetPos[ix]     + jx - pos[ix])     * morphSpeed
      pos[ix + 1] += (featTargetPos[ix + 1] + jy - pos[ix + 1]) * morphSpeed
      pos[ix + 2] += (featTargetPos[ix + 2] + jz - pos[ix + 2]) * morphSpeed

      // LERP color halus
      col[ix]     += (featTargetCol[ix]     - col[ix])     * colorSpeed
      col[ix + 1] += (featTargetCol[ix + 1] - col[ix + 1]) * colorSpeed
      col[ix + 2] += (featTargetCol[ix + 2] - col[ix + 2]) * colorSpeed
    }
    featCloud.geometry.attributes.position.needsUpdate = true
    featCloud.geometry.attributes.color.needsUpdate    = true
  }

  renderer.render(scene, camera)
}

// ---------- resize ----------
function onResize() {
  if (!renderer || !camera) return
  const W = window.innerWidth
  const H = window.innerHeight
  camera.aspect = W / H
  camera.updateProjectionMatrix()
  renderer.setSize(W, H)
}

// ---------- section transform (unchanged) ----------
function applySectionTransform(section: number, immediate = false) {
  if (!group) return
  const isMobile = window.innerWidth < 768
  const states: Record<number, any> = {
    0: { pos: { x: isMobile ? 0 : 0,    y: isMobile ? 1.5 : 0,  z: -1 }, scale: isMobile ? 0.7 : 1.3 }, // Sedikit lebih dekat
    1: { pos: { x: isMobile ? 1.5 : 0,  y: isMobile ? 3.2 : 2,  z: -4 }, scale: isMobile ? 0.5 : 0.8 },
    2: { pos: { x: isMobile ? -1.5 : -7.5, y: isMobile ? -3.2 : -2, z: -4 }, scale: isMobile ? 0.5 : 0.6 },
    3: { pos: { x: isMobile ? 0 : 0,    y: isMobile ? 3.2 : 2.5, z: -4 }, scale: isMobile ? 0.5 : 0.8 },
    4: { pos: { x: isMobile ? 1.5 : 3.5, y: isMobile ? -3.2 : -3, z: -4 }, scale: isMobile ? 0.5 : 0.6 },
  }
  const state = states[section] || states[0]
  if (immediate) {
    group.position.set(state.pos.x, state.pos.y, state.pos.z)
    group.scale.set(state.scale, state.scale, state.scale)
  } else {
    gsap.to(group.position, { ...state.pos, duration: 1.5, ease: 'power3.inOut' })
    gsap.to(group.scale, { x: state.scale, y: state.scale, z: state.scale, duration: 1.5, ease: 'power3.inOut' })
  }
}

// ---------- lifecycle ----------
onMounted(() => { init() })

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('click', onClick)
  // Bersihkan resource
  renderer?.dispose()
  featCloud?.geometry.dispose()
  featCloud?.material.dispose()
  faceCloud?.geometry.dispose()
  faceCloud?.material.dispose()
})

watch(() => colorMode.value, () => {
  if (faceCloud) {
    // Sesuaikan warna cangkang sedikit saat tema berubah
    faceCloud.material.color.set(colorMode.value === 'dark' ? 0xffdc1e : 0xffa500)
  }
})

watch(() => props.currentSection, (newSection) => {
  applySectionTransform(newSection)
  const secEmotions = ['happy', 'cool', 'angry', 'dizzy', 'sad']
  const targetEmotion = secEmotions[newSection] || 'happy'
  setEmotion(targetEmotion)
  currentEmotionIndex = emotions.indexOf(targetEmotion)
})
</script>

<style scoped>
#three-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  outline: none;
  /* Mencegah additive blending tumpah ke elemen HTML lain di Nuxt */
  isolation: isolate; 
}
</style>