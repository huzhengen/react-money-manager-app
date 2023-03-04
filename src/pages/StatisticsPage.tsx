import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')

  return (<div>
    <Gradient>
      <TopNav title="Statistics" icon={<Icon name="back" />} />
    </Gradient>
    <TimeRangePicker onSelect={setTimeRange} selected={timeRange} />
    <AddItemFloatButton />
  </div>)
}
