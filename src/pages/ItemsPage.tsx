import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { TopNav } from '../components/TopNav'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { useMenuStore } from '../stores/useMenuStore'
import { TopMenu } from '../components/TopMenu'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useMenuStore()
  return <div>
    <Gradient>
      <TopNav title="List" icon={<Icon name="menu" className="w-24px h-24px" onClick={() => setVisible(!visible)} />} />
    </Gradient>
    <TimeRangePicker onSelect={setTimeRange} selected={timeRange} />
    <ItemsSummary />
    <ItemsList />
    <AddItemFloatButton />
    <TopMenu visible={visible} onClickMask={() => setVisible(false)} />
  </div>
}
