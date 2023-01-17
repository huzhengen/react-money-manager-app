import type { ReactNode } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { Tags } from './ItemNewPage/Tags'

const StyledTabs = styled(Tabs)`
  .tabs-menu {}
  .tabs-menu-item {flex: 1}
  .tabs-menu-pane {}
`

const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[] = [
  { key: 'expenses', text: 'expenses', element: <Tags kind='expenses' /> },
  { key: 'income', text: 'income', element: <Tags kind='income' /> },
]

export const ItemsNewPage: React.FC = () => {
  const [tabItem, setTabItem] = useState<Item['kind']>('expenses')
  return (
    <>
      <Gradient>
        <TopNav title="New" icon={<Icon name="back" />} />
      </Gradient>
      <StyledTabs tabItems={tabItems} className="text-center" classPrefix='tabs'
        value={tabItem} onChange={tabItem => setTabItem(tabItem as Item['kind'])} />
    </>
  )
}
