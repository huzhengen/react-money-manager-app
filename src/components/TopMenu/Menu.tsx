import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../Icon'
import { useMenuStore } from '../../stores/useMenuStore'

interface Props {
  className?: string
}

const MyIcon = styled(Icon)`
  width: 32px; height: 32px; margin-right: 16px;
`

const items = [
  { icon: 'add', text: '开始记账', to: '/items/new' },
  { icon: 'pig', text: '我的记账', to: '/items' },
  { icon: 'chart', text: '统计图表', to: '/statistics' },
  // { icon: 'export', text: 'Export', to: '/export' },
  // { icon: 'noty', text: 'Notify', to: '/noty' },
]

export const Menu: React.FC<Props> = ({ className }) => {
  const { setVisible } = useMenuStore()
  return (
    <ul className={className} bg-white text-20px py-16px >
      {items.map(item =>
        <li key={item.to} onClick={() => setVisible(false)}>
          <NavLink flex items-center px-16px py-8px mb-4px color="#581608" to={item.to}>
            <MyIcon name={item.icon} />{item.text}
          </NavLink>
        </li>
      )}
    </ul>
  )
}
