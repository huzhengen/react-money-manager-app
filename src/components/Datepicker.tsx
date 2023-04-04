import { useEffect, useRef, useState } from 'react'
import { time } from '../lib/time'

type Props = {
  start?: Date
  end?: Date
  value?: Date
  onCancel?: () => void
  onConfirm?: (value: Date) => void
}

const getNow = () => time()

export const Datepicker: React.FC<Props> = (props) => {
  const { start, end, value, onCancel, onConfirm } = props
  const [, update] = useState({})
  const startTime = start ? time(start) : getNow().add(-10, 'years')
  const endTime = end ? time(end) : getNow().add(10, 'year')
  const valueTime = useRef(value ? time(value) : getNow())
  if (endTime.timestamp <= startTime.timestamp) {
    throw new Error('The end time must be later than the start time!')
  }
  const yearList = Array.from({ length: endTime.year - startTime.year + 1 })
    .map((_, index) => startTime.year + index)
  const monthList = Array.from({ length: 12 }).map((_, index) => index + 1)
  const dayList = Array.from({ length: valueTime.current.lastDayOfMonth.day })
    .map((_, index) => index + 1)
  const hoursList = Array.from({ length: 24 }).map((_, index) => index)
  const minutesList = Array.from({ length: 60 }).map((_, index) => index)
  return (
    <div>
      <div flex justify-between p-8px border-b-1 b-b-solid b="#f3f3f3" children-p-8px>
        <span onClick={onCancel}>Cancel</span>
        <span>Select date</span>
        <span onClick={() => onConfirm?.(valueTime.current.date)}>Confirm</span>
      </div>
      <div flex children-grow-1 text-center children-p-16px>
        <span>Year</span>
        <span>Month</span>
        <span>Day</span>
        <span>Hour</span>
        <span>Minute</span>
      </div>
      <div flex>
        <Column className="grow-1" items={yearList} value={valueTime.current.year}
          onChange={(year) => { valueTime.current.year = year; update({}) }} />
        <Column className="grow-1" items={monthList} value={valueTime.current.month}
          onChange={(month) => { valueTime.current.month = month; update({}) }} />
        <Column className="grow-1" items={dayList} value={valueTime.current.day}
          onChange={(day) => { valueTime.current.day = day; update({}) }} />
        <Column className="grow-1" items={hoursList} value={valueTime.current.hours}
          onChange={(hour) => { valueTime.current.hours = hour; update({}) }} />
        <Column className="grow-1" items={minutesList} value={valueTime.current.minutes}
          onChange={(minute) => { valueTime.current.minutes = minute; update({}) }} />
      </div>
    </div>
  )
}

type ColumnProps = {
  items: number[]
  value: number
  itemHeight?: number
  className?: string
  onChange: (value: number) => void
}

export const Column: React.FC<ColumnProps> = (props) => {
  const { items, value, itemHeight = 36, className, onChange } = props
  useEffect(() => {
    const index = items.indexOf(value)
    setTranslateY(index * (-itemHeight))
  }, [value])
  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const index = items.indexOf(value)
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
        onChange(items[Math.abs(y / itemHeight)])
      }}
    >
      <div border-b-1 border-t-1 b-t-solid b-b-solid b="#eee" absolute top="50%" w-full
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
