import { Tabs } from './Tabs'

export type TimeRange = 'thisMonth' | 'lastMonth' | 'custom'

type Props = {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
  timeRanges?: { key: TimeRange; text: string }[]
}
const defaultTimeRanges: { key: TimeRange; text: string }[] = [
  { key: 'thisMonth', text: 'this month' },
  { key: 'lastMonth', text: 'last month' },
  { key: 'custom', text: 'custom' },
]
export const TimeRangePicker: React.FC<Props> = (props) => {
  const { selected, onSelect, timeRanges = defaultTimeRanges } = props
  return <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
}
