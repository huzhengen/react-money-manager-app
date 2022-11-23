import { Icon } from './Icon'

interface Props {
  title?: string
}

export const Topnav: React.FC<Props> = ({ title = 'Money Manager' }) => {
  return <div text-white flex items-center p-16px>
    <Icon name="menu" className="w-24px h-24px mr-16px" />
    <h1 text-24px>{title}</h1>
  </div>
}
