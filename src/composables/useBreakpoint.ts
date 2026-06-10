import { ref, onMounted, onUnmounted } from 'vue'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

type Breakpoint = keyof typeof breakpoints

export function useBreakpoint() {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0)

  function onResize() {
    width.value = window.innerWidth
  }

  onMounted(() => window.addEventListener('resize', onResize))
  onUnmounted(() => window.removeEventListener('resize', onResize))

  function isAbove(bp: Breakpoint): boolean {
    return width.value >= breakpoints[bp]
  }

  function isBelow(bp: Breakpoint): boolean {
    return width.value < breakpoints[bp]
  }

  return {
    width,
    isAbove,
    isBelow,
    isMobile: () => isBelow('md'),
    isTablet: () => isAbove('md') && isBelow('lg'),
    isDesktop: () => isAbove('lg'),
  }
}
