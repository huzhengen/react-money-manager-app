import { useState } from 'react'
import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { Input } from '../components/Input'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
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
  const items2 = [
    { tag: { name: 'By a phone', sign: '📱' }, amount: 10000 },
    { tag: { name: 'Eating', sign: '🍲' }, amount: 20000 },
    { tag: { name: 'Take a taxi', sign: '🚕' }, amount: 68800 },
    { tag: { name: 'Shopping', sign: '🛒' }, amount: 38800 },
  ].map(item => ({ x: item.tag.name, y: item.amount / 100 }))
  const items3 = [
    { tag: { name: 'By a phone', sign: '📱' }, amount: 10000 },
    { tag: { name: 'Eating', sign: '🍲' }, amount: 20000 },
    { tag: { name: 'Take a taxi', sign: '🚕' }, amount: 68800 },
    { tag: { name: 'Shopping', sign: '🛒' }, amount: 38800 },
  ].map(item => ({ name: item.tag.name, value: item.amount, sign: item.tag.sign }))
  const [value, setValue] = useState('expenses')
  return (<div>
    <Gradient>
      <TopNav title="Statistics" icon={<BackIcon />} />
    </Gradient>
    <TimeRangePicker onSelect={setTimeRange} selected={timeRange} />
    <div flex p-16px items-center gap-x-16px>
      <span grow-0 shrink-0>Type</span>
      <div grow-1 shrink-1>
        <Input type="select" options={[
          { text: 'expenses', value: 'expenses' },
          { text: 'income', value: 'income' },
        ]} value={value} onChange={value => setValue(value)} disableError />
      </div>
    </div>
    <LineChart className="h-120px" items={items} />
    <PieChart className="h-260px m-t-16px" items={items2} />
    <RankChart className="m-t-8px" items={items3} />
  </div>)
}
