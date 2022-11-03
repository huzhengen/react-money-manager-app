import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { Link, useLocation, useOutlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'

interface LinkMap {
  '/welcome/1': string
  '/welcome/2': string
  '/welcome/3': string
  '/welcome/4': string
}

const linkMap: LinkMap = {
  '/welcome/1': '/welcome/2',
  '/welcome/2': '/welcome/3',
  '/welcome/3': '/welcome/4',
  '/welcome/4': '/welcome/xxx',
}

export const WelcomeLayout: React.FC = () => {
  const map = useRef<Record<string, ReactNode>>({})
  const location = useLocation()
  const outlet = useOutlet()
  map.current[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 }
  })

  return <div>
    <header>
      <img src={logo} alt="" />
      <h1>Manager</h1>
    </header>
    <main>{transitions((style, pathname) =>
      <animated.div key={pathname} style={style}>
        {map.current[pathname]}
      </animated.div>
    )}</main>
    <footer>
      <Link to={linkMap[location.pathname]}>Next</Link>
      <Link to="/xxx">Skip</Link>
    </footer>
  </div>
}

