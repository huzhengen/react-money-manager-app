import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'

const tabItems: { key: 'expenses' | 'income'; text: string }[] = [
  { key: 'expenses', text: 'expenses' },
  { key: 'income', text: 'income' },
]

export const ItemsNewPage: React.FC = () => {
  const [item, setItem] = useState<string>('expenses')
  return (
    <Gradient>
      <TopNav title="New" icon={<Icon name="back" />} />
      <Tabs tabItems={tabItems} value={item} onChange={setItem} />
    </Gradient>
  )
}
