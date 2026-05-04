<template>
  <canvas ref="canvasRef" id="three-canvas" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useColorMode } from '#imports'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const colorMode = useColorMode()

let animationId: number
let renderer: any, scene: any, camera: any, THREE: any

let raycaster: any
let instancedMesh: any
let dummy: any
let colorObj: any

let isDragging = false
let previousMousePosition = { x: 0, y: 0 }
let dragDistance = 0
let targetRotation = { x: 0, y: 0 }
let currentRotation = { x: 0, y: 0 }

let globalHueShift = 0

async function init() {
  if (!canvasRef.value) return

  // Dynamic import for SSR safety
  THREE = await import('three')
  
  dummy = new THREE.Object3D()
  colorObj = new THREE.Color()
  raycaster = new THREE.Raycaster()

  const canvas = canvasRef.value
  const W = canvas.clientWidth || window.innerWidth
  const H = canvas.clientHeight || window.innerHeight

  // Scene
  scene = new THREE.Scene()

  // Camera
  camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 1000)
  camera.position.set(0, 0, 5)

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  buildScene()
  animate()

  window.addEventListener('resize', onResize)
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mouseup', onMouseUp)
  canvas.addEventListener('mouseleave', onMouseUp)
  canvas.addEventListener('click', onClick)
}

let mouseX = 0, mouseY = 0

function onMouseDown(e: MouseEvent) {
  isDragging = true
  dragDistance = 0
  previousMousePosition = { x: e.clientX, y: e.clientY }
  if (canvasRef.value) canvasRef.value.style.cursor = 'grabbing'
}

function onMouseUp(e: MouseEvent) {
  isDragging = false
  if (canvasRef.value) canvasRef.value.style.cursor = 'default'
}

function onMouseMove(e: MouseEvent) {
  const rect = canvasRef.value!.getBoundingClientRect()
  mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1
  mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1
  
  if (isDragging) {
    const deltaX = e.clientX - previousMousePosition.x
    const deltaY = e.clientY - previousMousePosition.y
    dragDistance += Math.abs(deltaX) + Math.abs(deltaY)
    
    targetRotation.y += deltaX * 0.005
    targetRotation.x += deltaY * 0.005
    
    previousMousePosition = { x: e.clientX, y: e.clientY }
  }
  
  if (raycaster && camera && instancedMesh && !isDragging) {
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera)
    
    objects.forEach(o => o.isHovered = false)
    if (canvasRef.value) canvasRef.value.style.cursor = 'grab'
    
    const intersects = raycaster.intersectObject(instancedMesh)
    if (intersects.length > 0) {
      const instanceId = intersects[0].instanceId
      if (instanceId !== undefined) {
        objects[instanceId].isHovered = true
        if (canvasRef.value) canvasRef.value.style.cursor = 'pointer'
      }
    }
  }
}

function onClick(e: MouseEvent) {
  if (!instancedMesh || !raycaster || dragDistance > 5) return // Ignore if dragging
  
  raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera)
  const intersects = raycaster.intersectObject(instancedMesh)
  if (intersects.length > 0) {
    const instanceId = intersects[0].instanceId
    if (instanceId !== undefined && clock) {
      const hitPos = objects[instanceId].basePos
      const t = clock.getElapsedTime()
      
      // Shift the hue drastically to change the whole sphere color
      globalHueShift += 100 + Math.random() * 160
      
      // Calculate ripple delays based on distance
      objects.forEach(obj => {
         const distance = obj.basePos.distanceTo(hitPos)
         // Max distance is ~2.8, * 0.15 gives a ~0.4s wave propagation
         obj.hitTime = t + distance * 0.15 
         obj.targetHueOffset = obj.baseHueOffset + globalHueShift
      })
    }
  }
}

const objects: any[] = []
const bolts: any[] = []
let group: any

function isDark() {
  return colorMode.value === 'dark'
}

function makeLightningPoints(from: any, to: any, segments: number, jitter: number) {
  const points = []
  const dir = new THREE.Vector3().subVectors(to, from)
  const perp1 = new THREE.Vector3()
  const perp2 = new THREE.Vector3()
  
  if (Math.abs(dir.x) < 0.9) {
    perp1.crossVectors(dir, new THREE.Vector3(1, 0, 0)).normalize()
  } else {
    perp1.crossVectors(dir, new THREE.Vector3(0, 1, 0)).normalize()
  }
  perp2.crossVectors(dir, perp1).normalize()
  
  points.push(from.clone())
  for (let k = 1; k < segments; k++) {
    const t = k / segments
    const p = new THREE.Vector3().lerpVectors(from, to, t)
    p.add(perp1.clone().multiplyScalar((Math.random() - 0.5) * jitter))
    p.add(perp2.clone().multiplyScalar((Math.random() - 0.5) * jitter))
    points.push(p)
  }
  points.push(to.clone())
  return points
}

function buildScene() {
  while (scene.children.length > 0) scene.remove(scene.children[0])
  objects.length = 0
  bolts.length = 0

  const dark = isDark()
  const lineColor = dark ? 0x3a8a5a : 0x4abf7a
  const accentColor = dark ? 0x53d480 : 0x4cc96f

  const ambient = new THREE.AmbientLight(0xffffff, dark ? 0.4 : 0.6)
  scene.add(ambient)

  const light1 = new THREE.PointLight(dark ? 0x44ff88 : 0x33cc66, dark ? 2 : 1.5, 20)
  light1.position.set(3, 3, 3)
  scene.add(light1)

  const light2 = new THREE.PointLight(accentColor, 1, 15)
  light2.position.set(-3, -2, 2)
  scene.add(light2)

  group = new THREE.Group()
  scene.add(group)

  const nodeCount = 200
  const radius = 1.4
  const positions: any[] = []
  
  const nodeGeo = new THREE.SphereGeometry(0.04, 16, 16)
  const nodeMat = new THREE.MeshBasicMaterial({ 
    color: 0xffffff
  })
  
  instancedMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount)
  instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  group.add(instancedMesh)
  
  for (let i = 0; i < nodeCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / nodeCount)
    const theta = Math.sqrt(nodeCount * Math.PI) * phi
    
    const x = radius * Math.cos(theta) * Math.sin(phi)
    const y = radius * Math.sin(theta) * Math.sin(phi)
    const z = radius * Math.cos(phi)
    
    positions.push(new THREE.Vector3(x, y, z))
    
    const initialHueOffset = Math.random() * 360
    
    objects.push({ 
      index: i,
      basePos: new THREE.Vector3(x, y, z),
      baseHueOffset: initialHueOffset,
      hueOffset: initialHueOffset,
      targetHueOffset: initialHueOffset,
      animSpeed: 0.3 + Math.random() * 0.8,
      hitTime: -999,
      isHovered: false
    })
    
    dummy.position.set(x, y, z)
    dummy.updateMatrix()
    instancedMesh.setMatrixAt(i, dummy.matrix)
    instancedMesh.setColorAt(i, colorObj.setHex(0xffffff))
  }
  instancedMesh.instanceMatrix.needsUpdate = true
  if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true
  
  // Lightning bolt connection lines (static) + traveling light pulses
  const lineMat = new THREE.LineBasicMaterial({ 
    color: lineColor, 
    transparent: true, 
    opacity: dark ? 0.25 : 0.15 
  })
  
  const pulseGeo = new THREE.SphereGeometry(0.025, 8, 8)
  const pulseMat = new THREE.MeshBasicMaterial({ 
    color: dark ? 0x66ffaa : 0x44dd88,
    transparent: true,
    opacity: 0.9
  })
  
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dist = positions[i].distanceTo(positions[j])
      if (dist < 0.52) {
        const segments = 5
        const jitter = dist * 0.18
        const boltPoints = makeLightningPoints(positions[i], positions[j], segments, jitter)
        const geo = new THREE.BufferGeometry().setFromPoints(boltPoints)
        const line = new THREE.Line(geo, lineMat)
        group.add(line)
        
        // Create a pulse (small glowing sphere) that travels along this bolt
        const pulse = new THREE.Mesh(pulseGeo, pulseMat.clone())
        pulse.visible = false
        group.add(pulse)
        
        bolts.push({ 
          line, 
          pulse,
          path: boltPoints, 
          from: positions[i], 
          to: positions[j],
          speed: 0.8 + Math.random() * 1.5,    // travel speed
          delay: Math.random() * 8,              // start delay
          cooldown: 2 + Math.random() * 5,       // pause between pulses
          progress: 0,
          active: false,
          lastFinished: -999
        })
      }
    }
  }
}

let clock: any

function animate() {
  if (!THREE) return
  if (!clock) clock = new THREE.Clock()
  animationId = requestAnimationFrame(animate)

  const t = clock.getElapsedTime()
  
  // Animate light pulses traveling along bolts
  bolts.forEach(bolt => {
    if (!bolt.active) {
      // Check if it's time to start a new pulse
      if (t > bolt.delay && t - bolt.lastFinished > bolt.cooldown) {
        bolt.active = true
        bolt.progress = 0
        bolt.pulse.visible = true
        bolt.pulse.material.opacity = 0.9
      }
    }
    
    if (bolt.active) {
      bolt.progress += 0.02 * bolt.speed
      
      if (bolt.progress >= 1) {
        // Pulse reached the end
        bolt.active = false
        bolt.pulse.visible = false
        bolt.lastFinished = t
        bolt.progress = 0
      } else {
        // Interpolate position along the path
        const path = bolt.path
        const totalSegments = path.length - 1
        const segFloat = bolt.progress * totalSegments
        const segIndex = Math.min(Math.floor(segFloat), totalSegments - 1)
        const segT = segFloat - segIndex
        
        const p = new THREE.Vector3().lerpVectors(path[segIndex], path[segIndex + 1], segT)
        bolt.pulse.position.copy(p)
        
        // Fade in/out at edges
        const fade = Math.sin(bolt.progress * Math.PI)
        bolt.pulse.material.opacity = fade * 0.95
        const s = 0.8 + fade * 0.6
        bolt.pulse.scale.set(s, s, s)
      }
    }
  })

  if (group) {
    // Smoothly interpolate rotation
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1
    
    // Auto idle rotation if not dragging
    if (!isDragging) {
      targetRotation.y += 0.0015
      targetRotation.x += (mouseY * 0.1 - targetRotation.x) * 0.02
    }
    
    group.rotation.x = currentRotation.x
    group.rotation.y = currentRotation.y
  }

  objects.forEach(obj => {
    let timeSinceHit = 999
    
    // Check if the ripple has reached this node
    if (obj.hitTime !== -999) {
      if (t >= obj.hitTime) {
        timeSinceHit = t - obj.hitTime
        // Smoothly transition hue to new target
        obj.hueOffset += (obj.targetHueOffset - obj.hueOffset) * 0.01
      } else {
        // Ripple is still travelling towards this node
        timeSinceHit = 999 
      }
    }
    
    const hitEffect = timeSinceHit < 1.0 ? Math.sin(timeSinceHit * Math.PI) * 0.7 : 0
    const hoverEffect = obj.isHovered ? 0.3 : 0
    
    const wave = Math.sin(t * obj.animSpeed * 1.5 + obj.hueOffset) * 0.05 + hitEffect * 0.2 + hoverEffect * 0.1
    dummy.position.copy(obj.basePos).multiplyScalar(1 + wave)
    
    const scale = 1 + hitEffect * 2.0 + hoverEffect
    dummy.scale.set(scale, scale, scale)
    
    dummy.updateMatrix()
    instancedMesh.setMatrixAt(obj.index, dummy.matrix)
    
    const isDark = colorMode?.value === 'dark'
    const baseHue = isDark ? 140 : 130
    const hueRange = 40
    
    let currentHue = baseHue + Math.sin(t * obj.animSpeed + obj.hueOffset) * hueRange
    let lightness = 0.75 + Math.sin(t * obj.animSpeed * 0.5) * 0.1
    let saturation = 0.95
    
    if (timeSinceHit < 1.0 || obj.isHovered) {
       lightness = 0.95
       saturation = 1.0
    }
    
    const normalizedHue = ((currentHue % 360) + 360) % 360
    colorObj.setHSL(normalizedHue / 360, saturation, lightness)
    instancedMesh.setColorAt(obj.index, colorObj)
  })
  
  instancedMesh.instanceMatrix.needsUpdate = true
  if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true

  renderer.render(scene, camera)
}

function onResize() {
  if (!renderer || !camera || !canvasRef.value) return
  const W = window.innerWidth
  const H = window.innerHeight
  camera.aspect = W / H
  camera.updateProjectionMatrix()
  renderer.setSize(W, H)
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', onResize)
  if (canvasRef.value) {
     canvasRef.value.removeEventListener('mousemove', onMouseMove)
     canvasRef.value.removeEventListener('mousedown', onMouseDown)
     canvasRef.value.removeEventListener('mouseup', onMouseUp)
     canvasRef.value.removeEventListener('mouseleave', onMouseUp)
     canvasRef.value.removeEventListener('click', onClick)
  }
  renderer?.dispose()
})

watch(() => colorMode.value, () => {
  if (scene) buildScene()
})
</script>
