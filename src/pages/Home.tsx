import useSWR from 'swr'
import { Link, Navigate } from 'react-router-dom'
import { useAjax } from '../lib/ajax'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { Icon } from '../components/Icon'
import { Gradient } from '../components/Gradient'
import { TopNav } from '../components/TopNav'
import { MenuIcon } from '../components/MenuIcon'
import { TopMenu } from '../components/TopMenu'
import { useMenuStore } from '../stores/useMenuStore'

export const Home: React.FC = () => {
  const { visible, setVisible } = useMenuStore()
  const { get } = useAjax({ showLoading: true, handleError: false })
  const { data: meData, error: meError } = useSWR('/api/v1/me', async path =>
    (await get<Resource<User>>(path)).data.resource,
  { revalidateOnFocus: false }
  )
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path =>
    (await get<Resources<Item>>(path)).data,
  { revalidateOnFocus: false }
  )

  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError

  if (isLoadingMe || isLoadingItems) {
    return <div text-center p-16px>加载中...</div>
  }

  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />
  }

  return <div>
    <Gradient>
      <TopNav title='记账' icon={<MenuIcon />} />
    </Gradient>
    <div flex justify-center items-center>
      <Icon className="mt-20vh mb-20vh w-128px h-128px" name="pig" />
    </div>
    <div px-16px>
      <Link to="/items/new"><button j-btn>开始记账</button></Link>
    </div>
    <AddItemFloatButton />
    <TopMenu visible={visible} onClickMask={() => setVisible(false)} />
  </div >
}
