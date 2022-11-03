import * as React from 'react'
import welcome2 from '../assets/images/welcome2.svg'

export const Welcome2: React.FC = () => {
  return (
    <div text-center>
      <img w-128px h-150px src={welcome2} alt="" />
      <h2 text-32px mt-48px>Remind</h2>
    </div>
  )
}
