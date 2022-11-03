import * as React from 'react'
import welcome1 from '../assets/images/welcome1.svg'

export const Welcome1: React.FC = () => {
  return (
    <div text-center>
      <img w-128px h-130px src={welcome1} alt="" />
      <h2 text-32px mt-48px >Manage</h2>
    </div>
  )
}
