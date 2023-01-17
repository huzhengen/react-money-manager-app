import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'

type ItemKind = 'income' | 'expenses'
const tabItems: { key: ItemKind; text: string }[] = [
  { key: 'expenses', text: 'expenses' },
  { key: 'income', text: 'income' },
]

export const ItemsNewPage: React.FC = () => {
  const [tabItem, setTabItem] = useState<ItemKind>('expenses')
  return (
    <Gradient>
      <TopNav title="New" icon={<Icon name="back" />} />
      <Tabs tabItems={tabItems} className="children-flex-1 text-center"
        value={tabItem} onChange={item => setTabItem(item)} />
    </Gradient>
  )
}
