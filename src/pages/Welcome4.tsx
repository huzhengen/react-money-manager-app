import * as React from 'react'
import { Link } from 'react-router-dom'
import welcome4 from '../assets/images/welcome4.svg'

export const Welcome4: React.FC = () => {
  return (
    <div text-center>
      <img w-129px h-183px src={welcome4} alt="" />
      <h2 text-32px mt-48px>Sync</h2>
      <div mt-64px>
        <Link text-32px color="#6035BF" font-bold to="/home">Next</Link>
      </div>
    </div>
  )
}
