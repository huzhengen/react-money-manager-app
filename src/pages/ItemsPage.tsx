import styled from 'styled-components'
import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { Topnav } from '../components/Topnav'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { ItemsList } from './ItemsPage/ItemsList'
import { ItemsSummary } from './ItemsPage/ItemsSummary'

const Div = styled.div`
  background: linear-gradient(0deg, rgba(143,76,215,1) 0%, rgba(92,51,190,1) 100%);
`

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  return <div>
    <Div>
      <Topnav />
      <TimeRangePicker onSelected={setTimeRange} selected={timeRange} />
    </Div>
    <ItemsSummary />
    <ItemsList />
    <AddItemFloatButton />
  </div>
}
