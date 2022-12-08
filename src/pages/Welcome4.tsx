import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import welcome4 from '../assets/images/welcome4.svg'
import { useLocalStore } from '../stores/useLocalStore'

export const Welcome4: React.FC = () => {
  const nav = useNavigate()
  const { setHasReadWelcomes } = useLocalStore()
  const onSkip = () => {
    setHasReadWelcomes(true)
    nav('/home')
  }
  return (
    <div text-center>
      <img w-129px h-183px src={welcome4} alt="" />
      <h2 text-32px mt-48px>Sync</h2>
      <div mt-64px>
        <span text-32px color="#6035BF" font-bold onClick={onSkip}>Start</span>
      </div>
    </div>
  )
}
