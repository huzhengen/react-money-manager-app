import styled from 'styled-components'
import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { TopNav } from '../components/TopNav'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { useMenuStore } from '../stores/useMenuStore'
import { TopMenu } from '../components/TopMenu'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

const Div = styled.div`
  background: linear-gradient(0deg, rgba(143,76,215,1) 0%, rgba(92,51,190,1) 100%);
`

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useMenuStore()
  return <div>
    <Div>
      <TopNav />
      <TimeRangePicker onSelected={setTimeRange} selected={timeRange} />
    </Div>
    <ItemsSummary />
    <ItemsList />
    <AddItemFloatButton />
    <TopMenu visible={visible} onClickMask={() => setVisible(false)} />
  </div>
}
