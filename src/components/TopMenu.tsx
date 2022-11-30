import { CurrentUser } from './TopMenu/CurrentUser'
import { Menu } from './TopMenu/Menu'

interface Props {
  onClickMask?: () => void
}

export const TopMenu: React.FC<Props> = ({ onClickMask }) => {
  return (
    <>
      <div fixed top-0 left-0 w="100%" h="100%" className="bg-black:75"
        onClick={onClickMask} />
      <div fixed top-0 left-0 w="70vw" max-w-20em h-screen flex flex-col>
        <CurrentUser className="grow-0 shrink-0" />
        <Menu className="grow-1 shrink-1" />
      </div>
    </>
  )
}
