import { Tabs } from './Tabs'
export type TimeRange = 'thisMonth' | 'lastMonth' | 'custom'
interface Props {
  selected: TimeRange
  onSelect: (selected: TimeRange) => void
}
const timeRanges: { key: TimeRange; text: string }[] = [
  { key: 'thisMonth', text: 'this month' },
  { key: 'lastMonth', text: 'last month' },
  { key: 'custom', text: 'custom' },
]
export const TimeRangePicker: React.FC<Props> = ({ selected, onSelect }) => {
  return <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
}
