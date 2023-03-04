import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { LineChart } from '../components/LineChart'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const items = [
    { date: '2023-01-01', value: 15000 },
    { date: '2023-01-02', value: 25000 },
    { date: '2023-01-05', value: 10000 },
    { date: '2023-01-09', value: 5000 },
    { date: '2023-01-15', value: 6000 },
    { date: '2023-01-22', value: 8000 },
    { date: '2023-01-31', value: 7000 },
  ].map(item => ({ x: item.date, y: item.value }))
  return (<div>
    <Gradient>
      <TopNav title="Statistics" icon={<Icon name="back" />} />
    </Gradient>
    <TimeRangePicker onSelect={setTimeRange} selected={timeRange} />
    <AddItemFloatButton />
    <LineChart className="h-400px" items={items} />
  </div>)
}
