import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'
import { useSwipe } from '../hooks/useSwipe'
import { useLocalStore } from '../stores/useLocalStore'

const linkMap: Record<string, string> = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/home',
}

export const WelcomeLayout: React.FC = () => {
  const animating = useRef(false)
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  const [extraStyle, setExtraStyle] = useState({ position: 'relative' } as React.CSSProperties)
  // const [extraStyle, setExtraStyle] = useState<{ position: 'relative' | 'absolute' }>({ position: 'relative' })
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 500 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      animating.current = false
      setExtraStyle({ position: 'relative' })
    }
  })
  const main = useRef<HTMLElement>(null)
  const { direction } = useSwipe(main)
  const nav = useNavigate()
  useEffect(() => {
    if (direction === 'left') {
      if (animating.current) { return }
      animating.current = true
      nav(linkMap[location.pathname])
    }
  }, [direction, location.pathname, linkMap])
  const { setHasReadWelcomes } = useLocalStore()
  const onSkip = () => {
    setHasReadWelcomes(true)
    nav('/home')
  }
  return <div className="bg-#fd9f2b" relative h-screen flex flex-col items-stretch pb-16px>
    <span absolute text-white top-16px right-16px text-32px onClick={onSkip}>跳过</span>
    <header shrink-0 text-center pt-32px>
      <img src={logo} alt="" w-64px h-69px />
      <h1 text="#FFFFFF" text-32px>时刻存钱罐</h1>
    </header>
    <main shrink-1 grow-1 relative ref={main}>
      {transitions((style, pathname) =>
        <animated.div key={pathname} style={{ ...style, ...extraStyle }} w-full h-full p-16px flex>
          <div grow-1 bg-white flex justify-center items-center rounded-8px>
            {map.current[pathname]}
          </div>
        </animated.div>
      )}
    </main>
  </div>
}
