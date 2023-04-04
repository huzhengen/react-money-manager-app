import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../Icon'

interface Props {
  className?: string
}

const MyIcon = styled(Icon)`
  width: 32px; height: 32px; margin-right: 16px;
`
//  Bookkeeping
const items = [
  { icon: 'pig', text: 'Bookkeeping', to: '/items/new' },
  { icon: 'chart', text: 'Statistics', to: '/statistics' },
  { icon: 'export', text: 'Export', to: '/export' },
  { icon: 'noty', text: 'Notify', to: '/noty' },
]

export const Menu: React.FC<Props> = ({ className }) => {
  return (
    <ul className={className} bg-white text-20px py-16px >
      {items.map(item =>
        <li key={item.to}>
          <NavLink flex items-center px-16px py-8px mb-4px to={item.to}>
            <MyIcon name={item.icon} />{item.text}
          </NavLink>
        </li>
      )}
    </ul>
  )
}
