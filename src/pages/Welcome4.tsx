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
      <h2 text-32px mt-48px color="#581608">数据同步不怕丢</h2>
      <div mt-64px>
        <span text-32px color="#581608" font-bold onClick={onSkip}>进入应用</span>
      </div>
    </div>
  )
}
