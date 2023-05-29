import { useState } from 'react'
import useSWR from 'swr'
import { Gradient } from '../components/Gradient'
import { Input } from '../components/Input'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import type { Time } from '../lib/time'
import { time } from '../lib/time'
import { MenuIcon } from '../components/MenuIcon'
import { TopMenu } from '../components/TopMenu'
import { useMenuStore } from '../stores/useMenuStore'

type Groups = { happen_at: string; amount: number }[]
type Groups2 = { tag_id: string; tag: Tag; amount: number }[]

const format = 'yyyy-MM-dd'
type GetKeyParams = {
  start: Time
  end: Time
  kind: Item['kind']
  group_by: 'happen_at' | 'tag_id'
}
const getKey = ({ start, end, kind, group_by }: GetKeyParams) => {
  return `/api/v1/items/summary?happened_after=${start.format(format)}&happened_before=${end.format(format)}&kind=${kind}&group_by=${group_by}`
}

export const StatisticsPage: React.FC = () => {
  const { visible, setVisible } = useMenuStore()
  const [timeRange, setTimeRange] = useState<TimeRange>({
    name: 'thisMonth',
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth.add(1, 'day')
  })
  const [kind, setKind] = useState<Item['kind']>('income')
  const { get } = useAjax({ showLoading: true, handleError: true })
  const generateDefaultItems = (time: Time) => {
    return Array.from({ length: time.dayCountOfMonth }).map((_, i) => {
      const x = time.clone.add(i, 'day').format(format)
      return { x, y: 0 }
    })
  }
  const { start, end } = timeRange
  const defaultItems = generateDefaultItems(start)
  // LineChart
  const { data: items } = useSWR(
    getKey({ start, end, kind, group_by: 'happen_at' }),
    async (path) => {
      return (await get<{ groups: Groups; total: number }>(path))
        .data.groups.map(({ happen_at, amount }) => ({ x: happen_at, y: (amount / 100).toFixed(2) }))
    },
    { revalidateOnFocus: false }
  )
  const normalizedItems = defaultItems.map((defaultItem, index) => {
    const item = items?.find(item => item.x === defaultItem.x)
    return { ...defaultItem, ...item }
  })

  // PieChart
  const { data: items2 } = useSWR(
    getKey({ start, end, kind, group_by: 'tag_id' }),
    async (path) => {
      return (await get<{ groups: Groups2; total: number }>(path))
        .data.groups.map(({ tag, amount }) => ({ name: tag.name, amount: (amount / 100).toFixed(2), sign: tag.sign }))
    },
    { revalidateOnFocus: false }
  )

  return (<div>
    <Gradient>
      <TopNav title="统计图表" icon={<MenuIcon />} />
    </Gradient>
    <TimeRangePicker onSelect={setTimeRange} selected={timeRange} timeRanges={[
      {
        key: { name: 'thisMonth', start: time().firstDayOfMonth, end: time().lastDayOfMonth.add(1, 'day') },
        text: '本月'
      },
      {
        key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') },
        text: '上个月'
      }]} />
    <div flex p-16px items-center gap-x-16px>
      <span grow-0 shrink-0>类型</span>
      <div grow-1 shrink-1>
        <Input type="select" options={[
          { text: '收入', value: 'income' },
          { text: '支出', value: 'expenses' },
        ]} value={kind} onChange={kind => setKind(kind)} disableError />
      </div>
    </div>
    <LineChart className="h-120px" items={normalizedItems} />
    <PieChart className="h-260px m-t-16px" items={items2} />
    <RankChart className="m-t-8px" items={items2} />
    <TopMenu visible={visible} onClickMask={() => setVisible(false)} />
  </div>)
}

export default StatisticsPage
