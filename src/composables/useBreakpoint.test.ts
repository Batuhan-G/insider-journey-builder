import { describe, it, expect, afterEach } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { useBreakpoint } from './useBreakpoint'

function setWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width })
}

describe('useBreakpoint', () => {
  const originalWidth = window.innerWidth

  afterEach(() => {
    setWindowWidth(originalWidth)
  })

  it('reads the initial window width', () => {
    setWindowWidth(1200)
    const { width } = useBreakpoint()
    expect(width.value).toBe(1200)
  })

  it('isAbove returns true when width >= breakpoint', () => {
    setWindowWidth(1024)
    const { isAbove } = useBreakpoint()
    expect(isAbove('lg')).toBe(true)
  })

  it('isAbove returns false when width < breakpoint', () => {
    setWindowWidth(900)
    const { isAbove } = useBreakpoint()
    expect(isAbove('lg')).toBe(false)
  })

  it('isBelow returns true when width < breakpoint', () => {
    setWindowWidth(600)
    const { isBelow } = useBreakpoint()
    expect(isBelow('md')).toBe(true)
  })

  it('isBelow returns false when width >= breakpoint', () => {
    setWindowWidth(800)
    const { isBelow } = useBreakpoint()
    expect(isBelow('md')).toBe(false)
  })

  it('isMobile returns true below md (768px)', () => {
    setWindowWidth(600)
    const { isMobile } = useBreakpoint()
    expect(isMobile()).toBe(true)
  })

  it('isDesktop returns true at lg and above (1024px)', () => {
    setWindowWidth(1280)
    const { isDesktop } = useBreakpoint()
    expect(isDesktop()).toBe(true)
  })

  it('updates width on window resize event', async () => {
    setWindowWidth(800)
    let capturedWidth: ReturnType<typeof useBreakpoint>['width'] | undefined
    const Wrapper = defineComponent({
      setup() {
        const bp = useBreakpoint()
        capturedWidth = bp.width
        return {}
      },
      template: '<div />',
    })
    mount(Wrapper)
    setWindowWidth(400)
    window.dispatchEvent(new Event('resize'))
    await Promise.resolve()
    expect(capturedWidth!.value).toBe(400)
  })
})
