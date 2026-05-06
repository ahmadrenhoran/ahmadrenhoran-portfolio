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
let pointCloud: any

let targetRotation = { x: 0, y: 0 }
let currentRotation = { x: 0, y: 0 }
let mouseX = 0
let mouseY = 0

const emotions = ['happy', 'sad', 'angry', 'dizzy', 'laugh', 'cool']
let currentEmotionIndex = 0

const NUM_POINTS = 600
let targetPositions: Float32Array
let jitters: Float32Array

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

  const dark = colorMode.value === 'dark'

  group = new THREE.Group()
  scene.add(group)

  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(NUM_POINTS * 3)
  targetPositions = new Float32Array(NUM_POINTS * 3)
  jitters = new Float32Array(NUM_POINTS * 3)

  for (let i = 0; i < NUM_POINTS; i++) {
    // Initial random positions
    positions[i * 3] = (Math.random() - 0.5) * 4
    positions[i * 3 + 1] = (Math.random() - 0.5) * 4
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2

    // Fixed jitter for messy look
    jitters[i * 3] = (Math.random() - 0.5) * 0.15
    jitters[i * 3 + 1] = (Math.random() - 0.5) * 0.15
    jitters[i * 3 + 2] = (Math.random() - 0.5) * 0.05
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  // Custom point material (Techy neon dots)
  const material = new THREE.PointsMaterial({
    color: dark ? 0x4ade80 : 0x22c55e,
    size: 0.06,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  })

  pointCloud = new THREE.Points(geometry, material)
  group.add(pointCloud)

  setEmotion('happy') // Set initial target points
  applySectionTransform(props.currentSection, true)
  
  animate()

  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('click', onClick)
}

// ---- Geometry Generators for Point Cloud ---- //

function getCircle(count: number, cx: number, cy: number, r: number) {
  const pts = []
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r })
  }
  return pts
}

function getArc(count: number, cx: number, cy: number, r: number, startA: number, endA: number) {
  const pts = []
  for (let i = 0; i < count; i++) {
    const angle = startA + (i / Math.max(1, count - 1)) * (endA - startA)
    pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r })
  }
  return pts
}

function getLine(count: number, x1: number, y1: number, x2: number, y2: number) {
  const pts = []
  for (let i = 0; i < count; i++) {
    const t = i / Math.max(1, count - 1)
    pts.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t })
  }
  return pts
}

function getCross(count: number, cx: number, cy: number, size: number) {
  const pts = []
  const half = Math.floor(count / 2)
  pts.push(...getLine(half, cx - size, cy - size, cx + size, cy + size))
  pts.push(...getLine(count - half, cx - size, cy + size, cx + size, cy - size))
  return pts
}

function getAngle(count: number, cx: number, cy: number, size: number, facingRight: boolean) {
  const pts = []
  const half = Math.floor(count / 2)
  if (facingRight) { // >
    pts.push(...getLine(half, cx - size, cy + size, cx + size, cy))
    pts.push(...getLine(count - half, cx + size, cy, cx - size, cy - size))
  } else { // <
    pts.push(...getLine(half, cx + size, cy + size, cx - size, cy))
    pts.push(...getLine(count - half, cx - size, cy, cx + size, cy - size))
  }
  return pts
}

function setEmotion(emotion: string) {
  if (!targetPositions) return
  
  const pts: any[] = []
  
  // Head Outline (300 pts)
  pts.push(...getCircle(300, 0, 0, 1.3))
  
  // Eyes (80 pts each)
  if (emotion === 'happy') {
    pts.push(...getArc(80, -0.4, 0.3, 0.2, 0, Math.PI)) // ^
    pts.push(...getArc(80, 0.4, 0.3, 0.2, 0, Math.PI))  // ^
  } else if (emotion === 'sad' || emotion === 'cool') {
    pts.push(...getCircle(80, -0.4, 0.3, 0.15)) // o
    pts.push(...getCircle(80, 0.4, 0.3, 0.15))  // o
  } else if (emotion === 'angry') {
    pts.push(...getLine(80, -0.6, 0.5, -0.2, 0.1)) // \ 
    pts.push(...getLine(80, 0.2, 0.1, 0.6, 0.5))   // /
  } else if (emotion === 'dizzy') {
    pts.push(...getCross(80, -0.4, 0.3, 0.2))
    pts.push(...getCross(80, 0.4, 0.3, 0.2))
  } else if (emotion === 'laugh') {
    pts.push(...getAngle(80, -0.4, 0.3, 0.2, true))  // >
    pts.push(...getAngle(80, 0.4, 0.3, 0.2, false)) // <
  }
  
  // Mouth (140 pts)
  if (emotion === 'happy' || emotion === 'laugh') {
    pts.push(...getArc(140, 0, -0.1, 0.5, Math.PI, Math.PI * 2)) // U
  } else if (emotion === 'sad' || emotion === 'angry') {
    pts.push(...getArc(140, 0, -0.5, 0.5, 0, Math.PI)) // n
  } else if (emotion === 'dizzy') {
    pts.push(...getCircle(140, 0, -0.4, 0.25)) // O
  } else if (emotion === 'cool') {
    pts.push(...getLine(140, -0.3, -0.3, 0.3, -0.3)) // -
  }

  // Update target array
  for (let i = 0; i < NUM_POINTS; i++) {
    if (pts[i]) {
      targetPositions[i * 3] = pts[i].x
      targetPositions[i * 3 + 1] = pts[i].y
      targetPositions[i * 3 + 2] = 0 // Keep it flat 2D
    }
  }
}

function onMouseMove(e: MouseEvent) {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1

  targetRotation.y = mouseX * 0.4
  targetRotation.x = -mouseY * 0.4
}

function onClick() {
  if (!group) return
  
  currentEmotionIndex = (currentEmotionIndex + 1) % emotions.length
  setEmotion(emotions[currentEmotionIndex])

  // Bounce and scatter effect on click
  gsap.to(group.position, {
    y: group.position.y,
    duration: 0.15,
    yoyo: true,
    repeat: 1,
    ease: 'power1.inOut'
  })
}

let clock: any

function animate() {
  if (!THREE) return
  if (!clock) clock = new THREE.Clock()
  animationId = requestAnimationFrame(animate)

  const time = clock.getElapsedTime()

  if (group && pointCloud && targetPositions) {
    // Plane tracking cursor
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1
    
    group.rotation.x = currentRotation.x
    group.rotation.y = currentRotation.y
    
    const positions = pointCloud.geometry.attributes.position.array

    // Morph points to target positions
    for (let i = 0; i < NUM_POINTS; i++) {
      const ix = i * 3
      
      // Dynamic messy jitter (breathes over time)
      const jx = Math.sin(time * 3 + i) * 0.05 + jitters[ix]
      const jy = Math.cos(time * 3 + i) * 0.05 + jitters[ix + 1]
      
      const cx = positions[ix]
      const cy = positions[ix + 1]
      const cz = positions[ix + 2]
      
      const tx = targetPositions[ix]
      const ty = targetPositions[ix + 1]
      const tz = targetPositions[ix + 2]
      
      // Lerp
      positions[ix] += (tx + jx - cx) * 0.1
      positions[ix + 1] += (ty + jy - cy) * 0.1
      positions[ix + 2] += (tz - cz) * 0.1
    }
    
    pointCloud.geometry.attributes.position.needsUpdate = true
  }

  renderer.render(scene, camera)
}

function onResize() {
  if (!renderer || !camera) return
  const W = window.innerWidth
  const H = window.innerHeight
  camera.aspect = W / H
  camera.updateProjectionMatrix()
  renderer.setSize(W, H)
}

function applySectionTransform(section: number, immediate: boolean = false) {
  if (!group) return
  
  const isMobile = window.innerWidth < 768

  const states: Record<number, any> = {
    0: { pos: { x: isMobile ? 0 : 0, y: isMobile ? 2.5 : 0, z: -2 }, scale: isMobile ? 0.6 : 1.2 },
    1: { pos: { x: isMobile ? 1.5 : 0, y: isMobile ? 3.2 : 2, z: -4 }, scale: isMobile ? 0.5 : 0.8 },
    2: { pos: { x: isMobile ? -1.5 : -7.5, y: isMobile ? -3.2 : -2, z: -4 }, scale: isMobile ? 0.5 : 0.6 },
    3: { pos: { x: isMobile ? 0 : 0, y: isMobile ? 3.2 : 2.5, z: -4 }, scale: isMobile ? 0.5 : 0.8 },
    4: { pos: { x: isMobile ? 1.5 : 3.5, y: isMobile ? -3.2 : -3, z: -4 }, scale: isMobile ? 0.5 : 0.6 }
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

onMounted(() => {
  init()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('click', onClick)
  renderer?.dispose()
})

watch(() => colorMode.value, () => {
  if (scene) {
    // Force material update
    pointCloud.material.color.set(colorMode.value === 'dark' ? 0x4ade80 : 0x22c55e)
  }
})

watch(() => props.currentSection, (newSection) => {
  applySectionTransform(newSection)
  
  // Update emot based on section context
  const secEmotions = ['happy', 'cool', 'angry', 'dizzy', 'sad']
  const targetEmotion = secEmotions[newSection] || 'happy'
  setEmotion(targetEmotion)
  currentEmotionIndex = emotions.indexOf(targetEmotion)
})
</script>
