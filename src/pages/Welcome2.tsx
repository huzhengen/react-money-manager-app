import * as React from 'react'
import { Link } from 'react-router-dom'
import welcome2 from '../assets/images/welcome2.svg'

export const Welcome2: React.FC = () => {
  return (
    <div text-center>
      <img w-128px h-150px src={welcome2} alt="" />
      <h2 text-32px mt-48px color="#581608">Remind</h2>
      <div mt-64px>
        <Link text-32px color="#581608" font-bold to="/welcome/3">下一步</Link>
      </div>
    </div>
  )
}
