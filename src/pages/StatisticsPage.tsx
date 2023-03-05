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
    { date: '2023-01-03', value: 25000 },
    { date: '2023-01-04', value: 35000 },
    { date: '2023-01-05', value: 35000 },
    { date: '2023-01-06', value: 45000 },
    { date: '2023-01-07', value: 45000 },
    { date: '2023-01-08', value: 55000 },
    { date: '2023-01-09', value: 55000 },
    { date: '2023-01-10', value: 65000 },
    { date: '2023-01-11', value: 65000 },
    { date: '2023-01-12', value: 75000 },
    { date: '2023-01-13', value: 75000 },
    { date: '2023-01-14', value: 85000 },
    { date: '2023-01-15', value: 85000 },
    { date: '2023-01-16', value: 95000 },
    { date: '2023-01-17', value: 95000 },
    { date: '2023-01-18', value: 105000 },
    { date: '2023-01-19', value: 105000 },
    { date: '2023-01-20', value: 115000 },
    { date: '2023-01-21', value: 115000 },
    { date: '2023-01-22', value: 125000 },
    { date: '2023-01-23', value: 125000 },
    { date: '2023-01-24', value: 135000 },
    { date: '2023-01-25', value: 135000 },
    { date: '2023-01-26', value: 145000 },
    { date: '2023-01-27', value: 145000 },
    { date: '2023-01-28', value: 155000 },
    { date: '2023-01-29', value: 155000 },
    { date: '2023-01-31', value: 165000 },
  ].map(item => ({ x: item.date, y: item.value / 100 }))
  return (<div>
    <Gradient>
      <TopNav title="Statistics" icon={<Icon name="back" />} />
    </Gradient>
    <TimeRangePicker onSelect={setTimeRange} selected={timeRange} />
    <AddItemFloatButton />
    <LineChart className="h-120px" items={items} />
  </div>)
}
