import { useMenuStore } from '../stores/useMenuStore'
import { Icon } from './Icon'

export const MenuIcon: React.FC = () => {
  const { visible, setVisible } = useMenuStore()
  return (<Icon name="menu" className="w-24px h-24px" onClick={() => setVisible(!visible)} />)
}
