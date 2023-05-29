import * as React from 'react'
import { Link } from 'react-router-dom'
import welcome1 from '../assets/images/welcome1.svg'

export const Welcome1: React.FC = () => {
  return (
    <div text-center>
      <img w-128px h-130px src={welcome1} alt="" />
      <h2 text-32px mt-48px color="#581608">赚钱存进存钱罐</h2>
      <div mt-64px>
        <Link text-32px color="#581608" font-bold to="/welcome/3">下一步</Link>
      </div>
    </div>
  )
}
