import * as React from 'react'
import welcome3 from '../assets/images/welcome3.svg'

export const Welcome3: React.FC = () => {
  return (
    <div text-center>
      <img w-130px h-108px src={welcome3} alt="" />
      <h2 text-32px mt-48px>Statistics</h2>
    </div>
  )
}
