import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { TopNav } from '../components/TopNav'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { useMenuStore } from '../stores/useMenuStore'
import { TopMenu } from '../components/TopMenu'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Time, time } from '../lib/time'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
  const [timeRange, _setTimeRange] = useState<TimeRange>({
    name: 'thisMonth',
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth.add(1, 'day')
  })
  const [outOfRange, setOutOfRange] = useState(false)
  const setTimeRange = (t: TimeRange) => {
    if (t.start.timestamp > t.end.timestamp) {
      [t.start, t.end] = [t.end, t.start]
    }
    if (t.end.timestamp - t.start.timestamp > Time.DAY * 365) {
      setOutOfRange(true)
    } else {
      setOutOfRange(false)
    }
    _setTimeRange(t)
  }
  const { visible, setVisible } = useMenuStore()
  const { start, end } = timeRange
  return <div>
    <Gradient>
      <TopNav title="记账" icon={<Icon name="menu" className="w-24px h-24px" onClick={() => setVisible(!visible)} />} />
    </Gradient>
    <TimeRangePicker onSelect={setTimeRange} selected={timeRange} />
    {outOfRange
      ? <div text-center p-32px>
        Customized time span cannot exceed 365 days
      </div>
      : <>
        <ItemsSummary start={start} end={end} />
        <ItemsList start={start} end={end} />
      </>
    }
    <AddItemFloatButton />
    <TopMenu visible={visible} onClickMask={() => setVisible(false)} />
  </div>
}
