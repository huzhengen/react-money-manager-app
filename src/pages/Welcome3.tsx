import * as React from 'react'
import { Link } from 'react-router-dom'
import welcome3 from '../assets/images/welcome3.svg'

export const Welcome3: React.FC = () => {
  return (
    <div text-center>
      <img w-130px h-108px src={welcome3} alt="" />
      <h2 text-32px mt-48px>Statistics</h2>
      <div mt-64px>
        <Link text-32px color="#6035BF" font-bold to="/welcome/4">Next</Link>
      </div>
    </div>
  )
}
