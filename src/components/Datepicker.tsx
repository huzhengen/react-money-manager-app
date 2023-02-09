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
  const monthList = Array.from({ length: 12 }).map((_, index) => index + 1)
  const dayList = Array.from({ length: valueTime.lastDayOfMonth.day })
    .map((_, index) => index + 1)
  return (
    <div flex>
      <Column className="grow-1" items={yearList} value={valueTime.year} />
      <Column className="grow-1" items={monthList} value={valueTime.month} />
      <Column className="grow-1" items={dayList} value={valueTime.day} />
    </div>
  )
}

type ColumnProps = {
  items: number[]
  value: number
  itemHeight?: number
  className?: string
}

export const Column: React.FC<ColumnProps> = (props) => {
  const { items, value, itemHeight = 36, className } = props
  const index = items.indexOf(value)

  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, _setTranslateY] = useState(index * (-itemHeight))
  const setTranslateY = (y: number) => {
    // y = Math.min(y, 0)
    // y = Math.max(y, (yearList.length - 1) * -itemHeight)
    if (y > 0) { y = 0 }
    if (y < (items.length - 1) * (-itemHeight)) {
      y = (items.length - 1) * (-itemHeight)
    }
    _setTranslateY(y)
  }
  return (
    <div h="50vh" overflow-hidden relative className={className}
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
        const remainder = translateY % itemHeight
        let y = translateY - remainder
        if (Math.abs(remainder) > itemHeight / 2) {
          y += itemHeight * (remainder > 0 ? 1 : -1)
        }
        setTranslateY(y)
        setIsTouching(false)
      }}
    >
      <div border-b-1 border-t-1 b="#eee" absolute top="50%" w-full
        style={{ height: itemHeight, transform: `translateY(${-itemHeight / 2}px)` }} />
      <div absolute top="50%" w-full style={{ transform: `translateY(${-itemHeight / 2}px)` }}>
        <ol style={{ transform: `translateY(${translateY}px)` }}
          text-center children-flex children-items-center children-justify-center>
          {items.map(item =>
            <li key={item} style={{ height: itemHeight }}>{item}</li>
          )}
        </ol>
      </div>
    </div>
  )
}
