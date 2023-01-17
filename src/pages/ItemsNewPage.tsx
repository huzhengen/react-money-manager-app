import type { ReactNode } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'

const StyledTabs = styled(Tabs)`
  .tabs-menu {}
  .tabs-menu-item {flex: 1}
  .tabs-menu-pane {}
`

type ItemKind = 'income' | 'expenses'
const tabItems: { key: ItemKind; text: string; element?: ReactNode }[] = [
  { key: 'expenses', text: 'expenses', element: <div>expenses</div> },
  { key: 'income', text: 'income', element: <div>income</div> },
]

export const ItemsNewPage: React.FC = () => {
  const [tabItem, setTabItem] = useState<ItemKind>('expenses')
  return (
    <>
      <Gradient>
        <TopNav title="New" icon={<Icon name="back" />} />
      </Gradient>
      <StyledTabs tabItems={tabItems} className="text-center" classPrefix='tabs'
        value={tabItem} onChange={tabItem => setTabItem(tabItem as ItemKind)} />
    </>
  )
}
