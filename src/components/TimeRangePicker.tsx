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
    text: 'this month'
  },
  {
    key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') },
    text: 'last month'
  },
  {
    key: { name: 'custom', start: time(), end: time() },
    text: 'custom'
  },
]
export const TimeRangePicker: React.FC<Props> = (props) => {
  const { selected, onSelect: _onSelect, timeRanges = defaultTimeRanges } = props
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const onConfirm = () => {
    _onSelect({
      name: 'custom',
      start: time(),
      end: time()
    })
  }
  const { popup, show } = usePopup({
    zIndex: 'var(--z-dialog)',
    children: <div onClick={onConfirm}>
      <header text-18px bg="[var(--color-purple)]" text-white py-13px p-l-16px>Please select a time</header>
      <main p-16px>
        <Input type="date" className="w280px" disableError label="Start Time" value={start} onChange={d => setStart(d)} />
        <Input type="date" className="mt-8px" disableError label="End Time" value={end} onChange={d => setEnd(d)} />
      </main>
      <footer text-right>
        <button border-none bg-transparent px-16px py-8px>Cancel</button>
        <button border-none bg-transparent px-16px py-8px>Confirm</button>
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
