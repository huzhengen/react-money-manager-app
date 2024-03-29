import type { FormEventHandler, ReactNode } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import { hasError, validate } from '../lib/validate'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import { time } from '../lib/time'
import { MenuIcon } from '../components/MenuIcon'
import { TopMenu } from '../components/TopMenu'
import { useMenuStore } from '../stores/useMenuStore'
import { ItemAmount } from './ItemNewPage/ItemAmount'
import { ItemDate } from './ItemNewPage/ItemDate'
import { Tags } from './ItemNewPage/Tags'

const StyledTabs = styled(Tabs)`
  .tabs-menu {}
  .tabs-menu-item {flex: 1}
  .tabs-menu-pane {}
`

export const ItemsNewPage: React.FC = () => {
  const { visible, setVisible } = useMenuStore()
  const nav = useNavigate()
  const { data, setData, setError, } = useCreateItemStore()
  const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[] = [
    {
      key: 'income',
      text: '收入',
      element: <Tags kind='income' value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} />
    },
    {
      key: 'expenses',
      text: '支出',
      element: <Tags kind='expenses' value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} />
    },
  ]
  const { post: postWithoutLoading } = useAjax({ showLoading: true, handleError: true })
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'kind', type: 'required', message: '类型必填' },
      { key: 'tag_ids', type: 'required', message: '标签必填' },
      { key: 'happen_at', type: 'required', message: '日期必填' },
      { key: 'amount', type: 'required', message: '金额必填' },
      { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为0' },
    ])
    setError(newError)
    if (hasError(newError)) {
      const message = Object.values(newError).flat().join('\n')
      window.alert(message)
    } else {
      await postWithoutLoading<Resource<Item>>('/api/v1/items', data)
      setData({
        happen_at: time(new Date()).isoString,
        amount: 0,
      })
      nav('/items')
    }
  }
  return (
    <form h-screen flex flex-col onSubmit={onSubmit}>
      <Gradient className='grow-0 shrink-0'>
        <TopNav title="记账" icon={<MenuIcon />} />
      </Gradient>
      <StyledTabs tabItems={tabItems}
        className="text-center grow-1 shrink-1 overflow-hidden" classPrefix='tabs'
        value={data.kind!}
        onChange={tabItem => setData({ kind: tabItem as Item['kind'] })} />
      <ItemAmount className="grow-0 shrink-0"
        itemDate={<ItemDate value={data.happen_at} onChange={happen_at => setData({ happen_at })} />}
        value={data.amount} onChange={amount => setData({ amount })}
      />
      <TopMenu visible={visible} onClickMask={() => setVisible(false)} />
    </form>
  )
}
