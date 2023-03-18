import { useState } from 'react'
import useSWR from 'swr'
import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { Input } from '../components/Input'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import { time } from '../lib/time'

type Groups = { happen_at: string; amount: number }[]

const format = 'yyyy-MM-dd'

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [kind, setKind] = useState('expenses')
  const { get } = useAjax({ showLoading: false, handleError: true })
  const generateStartEndAndDefaultItems = () => {
    const defaultItems: { x: string; y: number }[] = []
    if (timeRange === 'thisMonth') {
      const startTime = time().firstDayOfMonth
      const start = startTime.format(format)
      const endTime = time().lastDayOfMonth.add(1, 'day')
      const end = endTime.format(format)
      for (let i = 0; i < startTime.dayCountOfMonth; i++) {
        const x = startTime.clone.add(i, 'day').format(format)
        defaultItems.push({ x, y: 0 })
      }
      return { start, end, defaultItems }
    } else {
      return { start: '', end: '', defaultItems: [] }
    }
  }
  const { start, end, defaultItems } = generateStartEndAndDefaultItems()
  const { data: items } = useSWR(
    `/api/v1/items/summary?happened_after=${start}&happened_before=${end}&kind=${kind}&group_by=happen_at`,
    async (path) => {
      return (await get<{ groups: Groups; total: number }>(path))
        .data.groups.map(({ happen_at, amount }) => ({ x: happen_at, y: amount }))
    }
  )
  const normalizedItems = defaultItems.map((defaultItem, index) => {
    const item = items?.find(item => item.x === defaultItem.x)
    if (item) {
      return { x: defaultItem.x, y: item.y }
    } else {
      return defaultItem
    }
  })

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

  return (<div>
    <Gradient>
      <TopNav title="Statistics" icon={<BackIcon />} />
    </Gradient>
    <TimeRangePicker onSelect={setTimeRange} selected={timeRange} timeRanges={[
      { key: 'thisMonth', text: 'this month1' }, { key: 'lastMonth', text: 'last month' }]} />
    <div flex p-16px items-center gap-x-16px>
      <span grow-0 shrink-0>Type</span>
      <div grow-1 shrink-1>
        <Input type="select" options={[
          { text: 'expenses', value: 'expenses' },
          { text: 'income', value: 'income' },
        ]} value={kind} onChange={kind => setKind(kind)} disableError />
      </div>
    </div>
    <LineChart className="h-120px" items={normalizedItems} />
    <PieChart className="h-260px m-t-16px" items={items2} />
    <RankChart className="m-t-8px" items={items3} />
  </div>)
}
