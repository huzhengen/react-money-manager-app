import type { FormEventHandler, ReactNode } from 'react'
import styled from 'styled-components'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import { hasError, validate } from '../lib/validate'
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
  const { data, setData, setError, } = useCreateItemStore()
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
  const { post: postWithoutLoading } = useAjax({ showLoading: true, handleError: true })
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: 'Kind is required' },
      { key: 'tag_ids', type: 'required', message: 'Sign is required' },
      { key: 'happen_at', type: 'required', message: 'Date is required' },
      { key: 'amount', type: 'required', message: 'Amount is required' },
      { key: 'amount', type: 'notEqual', value: 0, message: 'Amount cannot be 0' },
    ])
    setError(newError)
    if (hasError(newError)) {
      const message = Object.values(newError).flat().join('\n')
      window.alert(message)
    } else {
      await postWithoutLoading<Resource<Item>>('/api/v1/items', data)
    }
  }
  return (
    <form h-screen flex flex-col onSubmit={onSubmit}>
      <Gradient className='grow-0 shrink-0'>
        <TopNav title="New" icon={<Icon name="back" />} />
      </Gradient>
      <StyledTabs tabItems={tabItems}
        className="text-center grow-1 shrink-1 overflow-hidden" classPrefix='tabs'
        value={data.kind!}
        onChange={tabItem => setData({ kind: tabItem as Item['kind'] })} />
      <ItemAmount className="grow-0 shrink-0"
        itemDate={<ItemDate value={data.happen_at} onChange={happen_at => setData({ happen_at })} />}
        value={data.amount} onChange={amount => setData({ amount })}
      />
    </form>
  )
}
