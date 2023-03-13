import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import { ItemAmount } from './ItemNewPage/ItemAmount'
import { ItemDate } from './ItemNewPage/ItemDate'
import { Tags } from './ItemNewPage/Tags'

const StyledTabs = styled(Tabs)`
  .tabs-menu {}
  .tabs-menu-item {flex: 1}
  .tabs-menu-pane {}
`

export const ItemsNewPage: React.FC = () => {
  const { data, setData } = useCreateItemStore()
  const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[] = [
    {
      key: 'expenses',
      text: 'expenses',
      element: <Tags kind='expenses' value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} />
    },
    {
      key: 'income',
      text: 'income',
      element: <Tags kind='income' value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} />
    },
  ]
  return (
    <div h-screen flex flex-col>
      <Gradient className='grow-0 shrink-0'>
        <TopNav title="New" icon={<Icon name="back" />} />
      </Gradient>
      <StyledTabs tabItems={tabItems}
        className="text-center grow-1 shrink-1 overflow-hidden" classPrefix='tabs'
        value={data.kind!}
        onChange={tabItem => setData({ kind: tabItem as Item['kind'] })} />
      <ItemAmount className="grow-0 shrink-0"
        itemDate={<ItemDate value={data.happen_at} onChange={d => setData({ happen_at: d })} />}
      />
      {JSON.stringify(data)}
    </div>
  )
}
