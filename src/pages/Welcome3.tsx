import * as React from 'react'
import { Link } from 'react-router-dom'
import welcome3 from '../assets/images/welcome3.svg'

export const Welcome3: React.FC = () => {
  return (
    <div text-center>
      <img w-130px h-108px src={welcome3} alt="" />
      <h2 text-32px mt-48px color="#581608">收支数据可视化</h2>
      <div mt-64px>
        <Link text-32px color="#581608" font-bold to="/welcome/4">下一步</Link>
      </div>
    </div>
  )
}
