import { useState } from 'react'
import { time } from '../lib/time'

type Props = {
  start?: Date
  end?: Date
  value?: Date
}

export const Datepicker: React.FC<Props> = (props) => {
  const { start, end, value } = props
  const startTime = start ? time(start) : time(start).add(-10, 'years')
  const endTime = end ? time(end) : time(end).add(10, 'years')
  const valueTime = value ? time(value) : time()
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('The end time must be later than the start time!')
  }
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, index) => startTime.year + index)
  const index = yearList.indexOf(valueTime.year)

  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, setTranslateY] = useState(index * (-36))
  return (
    <div h="50vh" overflow-hidden relative
      onTouchStart={(e) => {
        setIsTouching(true)
        setLastY(e.touches[0].clientY)
      }}
      onTouchMove={(e) => {
        if (isTouching) {
          const y = e.touches[0].clientY
          const dy = y - lastY
          setTranslateY(translateY + dy)
          setLastY(y)
        }
      }}
      onTouchEnd={() => {
        const remainder = translateY % 36
        let y = translateY - remainder
        if (Math.abs(remainder) > 18) {
          y += 36 * (remainder > 0 ? 1 : -1)
        }
        setTranslateY(y)
        setIsTouching(false)
      }}
    >
      <div b-1 b-red h-36px absolute top="[calc(50%-18px)]" w-full />
      <div absolute top="[calc(50%-18px)]" w-full>
        <ol children-h-36px text-center children-leading-36px
          style={{ transform: `translateY(${translateY}px)` }}>
          {yearList.map(year => <li key={year}>{year}</li>)}
        </ol>
      </div>
    </div>
  )
}
