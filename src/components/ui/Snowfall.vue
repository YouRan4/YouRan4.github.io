<template>
  <canvas 
    ref="canvasRef" 
    id="snow-canvas" 
    class="fixed inset-0 pointer-events-none z-[900]" 
    aria-hidden="true"
  >
  </canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'

// --- Props 定义 ---
interface SnowfallProps {
  enabledMonths?: number[];
  densityMultiplier?: number;
}

const props = withDefaults(defineProps<SnowfallProps>(), {
  // JS 月份 0=一月, 11=十二月
  enabledMonths: () => [11, 0, 1], 
  densityMultiplier: 1.0,
});

// --- 状态和 Ref ---
const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let rafId: number | null = null
// 定义雪花粒子类型
interface Flake {
    x: number;
    y: number;
    r: number; // 半径
    s: number; // 速度
    w: number; // 风速/摇摆
    a: number; // 角度
}
let flakes: Flake[] = []

// --- 核心工具函数 ---

const isSnowEnabled = computed(() => {
  // 获取当前月份 (0-11)
  const currentMonth = new Date().getMonth() 
  return props.enabledMonths.includes(currentMonth)
})

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function createFlakes(count: number) {
  if (!canvasRef.value) return
  const { width, height } = canvasRef.value
  
  flakes = Array.from({ length: count }, () => {
    return {
      x: rand(0, width),
      y: rand(0, height),
      r: rand(2, 4.5), 
      s: rand(0.8, 2.0), 
      w: rand(-0.6, 0.6), 
      a: rand(0, Math.PI * 2),
    }
  })
}

/**
 * 核心修改：使用 window.innerWidth/Height 来确保 Canvas 绘图尺寸覆盖整个视口。
 * 这解决了 Canvas 尺寸依赖 CSS 渲染尺寸 (clientWidth) 不足的问题。
 */
function resize() {
  if (!canvasRef.value) return
  
  // 1. 设置 Canvas 的绘图尺寸为视口尺寸
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight

  // 2. 重新计算雪花密度
  const area = canvasRef.value.width * canvasRef.value.height
  const density = Math.min(
    240,
    Math.round((area / 35000) * props.densityMultiplier),
  )
  createFlakes(density)
}

function step() {
  if (!ctx || !canvasRef.value) return
  
  const { width, height } = canvasRef.value
  
  ctx.clearRect(0, 0, width, height)
  ctx.shadowColor = 'rgba(255,255,255,0.8)'
  ctx.shadowBlur = 4
  
  for (let i = 0; i < flakes.length; i++) {
    const f = flakes[i]
    f.y += f.s
    f.x += f.w
    f.a += f.w * 0.02
    
    // 边界检查和重置
    if (f.y > height) {
      f.y = -5
      f.x = rand(0, width)
    }
    if (f.x < 0) f.x = width
    if (f.x > width) f.x = 0

    // 绘制复杂雪花
    const arms = 6
    const len = f.r * 2.6
    const branchLen = len * 0.35
    
    ctx.save()
    ctx.translate(f.x, f.y)
    ctx.rotate(f.a)
    ctx.strokeStyle = 'rgba(255,255,255,1)'
    ctx.lineWidth = 1.2
    
    for (let k = 0; k < arms; k++) {
      const ang = (Math.PI * 2 / arms) * k
      const tipX = Math.cos(ang) * len
      const tipY = Math.sin(ang) * len
      
      // 主干
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(tipX, tipY)
      ctx.stroke()
      
      // 侧枝
      const midX = tipX * 0.65
      const midY = tipY * 0.65
      const b1 = ang + Math.PI / 6
      const b2 = ang - Math.PI / 6
      
      ctx.beginPath()
      ctx.moveTo(midX, midY)
      ctx.lineTo(midX + Math.cos(b1) * branchLen, midY + Math.sin(b1) * branchLen)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(midX, midY)
      ctx.lineTo(midX + Math.cos(b2) * branchLen, midY + Math.sin(b2) * branchLen)
      ctx.stroke()
    }
    ctx.restore()
  }
  
  rafId = requestAnimationFrame(step)
}

function init() {
  if (!isSnowEnabled.value) {
    cleanup() 
    return
  }
  
  if (!canvasRef.value || ctx) return 

  ctx = canvasRef.value.getContext('2d')
  
  resize() // 首次初始化大小和雪花
  step()
  
  window.addEventListener('resize', resize)
}

function cleanup() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  window.removeEventListener('resize', resize)
  ctx = null
  flakes = []
}

// --- Vue 生命周期钩子 ---

onMounted(() => {
  init()
});

onBeforeUnmount(() => {
  cleanup()
});

</script>

<script lang="ts">
import { defineComponent } from 'vue';

// 解决 Astro/TypeScript 的导入错误 (ts(1192))
export default defineComponent({})
</script>