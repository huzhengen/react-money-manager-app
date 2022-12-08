import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

interface Config {
  onTouchStart?: (e: TouchEvent) => void
  onTouchMove?: (e: TouchEvent) => void
  onTouchEnd?: (e: TouchEvent) => void
}
export const useSwipe = (elementRef: RefObject<HTMLElement>, config?: Config) => {
  const [direction, setDirection] = useState<'' | 'left' | 'right' | 'up' | 'down'>('')
  const x = useRef(-1)
  const y = useRef(-1)
  const dx = useRef(0)
  const dy = useRef(0)
  const onTouchStart = (e: TouchEvent) => {
    config?.onTouchStart?.(e)
    setDirection('')
    x.current = e.touches[0].clientX
    y.current = e.touches[0].clientY
  }
  const onTouchMove = (e: TouchEvent) => {
    config?.onTouchMove?.(e)
    const newX = e.touches[0].clientX
    const newY = e.touches[0].clientY
    dx.current = newX - x.current
    dy.current = newY - y.current
  }
  const onTouchEnd = (e: TouchEvent) => {
    config?.onTouchEnd?.(e)
    if (Math.abs(dx.current) > Math.abs(dy.current)) {
      if (Math.abs(dx.current) < 3) {
        setDirection('')
      } else if (dx.current > 0) {
        setDirection('right')
      } else {
        setDirection('left')
      }
    } else {
      if (Math.abs(dy.current) < 3) {
        setDirection('')
      } else if (dy.current > 0) {
        setDirection('down')
      } else {
        setDirection('up')
      }
    }
  }
  useEffect(() => {
    if (!elementRef.current) { return }
    elementRef.current.addEventListener('touchstart', onTouchStart)
    elementRef.current.addEventListener('touchmove', onTouchMove)
    elementRef.current.addEventListener('touchend', onTouchEnd)
    return () => {
      if (!elementRef.current) { return }
      elementRef.current.removeEventListener('touchstart', onTouchStart)
      elementRef.current.removeEventListener('touchmove', onTouchMove)
      elementRef.current.removeEventListener('touchend', onTouchEnd)
    }
  }, [])
  return { direction }
}
