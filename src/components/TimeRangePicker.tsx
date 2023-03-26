import { usePopup } from '../hooks/usePopup'
import { Tabs } from './Tabs'

export type TimeRange =
  | 'thisYear'
  | 'thisMonth'
  | 'lastMonth'
  | 'twoMonthsAgo'
  | 'threeMonthsAgo'
  | 'custom'

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
  const { selected, onSelect: _onSelect, timeRanges = defaultTimeRanges } = props
  const onConfirm = () => {
    _onSelect('custom')
    hide()
  }
  const { popup, show, hide } = usePopup({ children: <div onClick={onConfirm}>custom</div>, position: 'center' })
  const onSelect = (key: TimeRange) => {
    if (key === 'custom') {
      show()
    } else {
      _onSelect(key)
    }
  }
  return <>
    {popup}
    <Tabs tabItems={timeRanges} value={selected} onChange={onSelect} />
  </>
}
