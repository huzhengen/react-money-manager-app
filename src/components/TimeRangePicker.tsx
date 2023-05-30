import { useState } from 'react'
import { usePopup } from '../hooks/usePopup'
import type { Time } from '../lib/time'
import { time } from '../lib/time'
import { Input } from './Input'
import { Tabs } from './Tabs'

export type TimeRange = {
  start: Time
  end: Time
  name: 'thisYear' | 'thisMonth' | 'lastMonth' | 'twoMonthsAgo' | 'threeMonthsAgo' | 'custom'
}

type Props = {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
  timeRanges?: { key: TimeRange; text: string }[]
}
const defaultTimeRanges: { key: TimeRange; text: string }[] = [
  {
    key: { name: 'thisMonth', start: time().firstDayOfMonth, end: time().lastDayOfMonth.add(1, 'day') },
    text: '本月'
  },
  {
    key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') },
    text: '上个月'
  },
  {
    key: { name: 'custom', start: time(), end: time() },
    text: '自定义'
  },
]
export const TimeRangePicker: React.FC<Props> = (props) => {
  const { selected, onSelect: _onSelect, timeRanges = defaultTimeRanges } = props
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const onConfirm = () => {
    _onSelect({
      name: 'custom',
      start: time(start),
      end: time(end).add(1, 'day')
    })
    hide()
  }
  const { popup, show, hide } = usePopup({
    zIndex: 'var(--z-dialog)',
    children: <div>
      <header text-18px bg="[var(--color-orange)]" text-white py-13px p-l-16px>请选择日期</header>
      <main p-16px>
        <Input type="date" className="w280px" disableError label="开始时间" value={start} onChange={d => setStart(d)} />
        <Input type="date" className="mt-8px" disableError label="结束时间" value={end} onChange={d => setEnd(d)} />
      </main>
      <footer text-right pb-13px>
        <button border-none bg-transparent px-16px py-8px color="[var(--color-brown)]" onClick={() => hide()}>取消</button>
        <button border-none bg-transparent px-16px py-8px color="[var(--color-brown)]" onClick={onConfirm}>确认</button>
      </footer>
    </div>,
    position: 'center'
  })
  const onSelect = (timeRange: TimeRange) => {
    if (timeRange.name === 'custom') {
      show()
    } else {
      _onSelect(timeRange)
    }
  }
  return <>
    {popup}
    <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
  </>
}
