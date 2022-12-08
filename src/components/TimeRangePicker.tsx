import s from './TimeRangePicker.module.scss'
export type TimeRange = 'thisMonth' | 'thisYear' | 'custom'
interface Props {
  selected: TimeRange
  onSelected: (selected: TimeRange) => void
}
const timeRanges: { key: TimeRange; text: string }[] = [
  { key: 'thisMonth', text: 'this month' },
  { key: 'thisYear', text: 'this year' },
  { key: 'custom', text: 'custom' },
]
export const TimeRangePicker: React.FC<Props> = ({ selected, onSelected }) => {
  return <ol flex text-white children-px-24px children-py-12px>
    {timeRanges.map(tr => <li key={tr.key} className={tr.key === selected ? s.selected : ''}
    onClick={() => onSelected(tr.key)}>
      {tr.text}
    </li>)}
  </ol>
}
