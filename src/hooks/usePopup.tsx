import { useState } from 'react'
import { Popup } from '../components/Popup'

export const usePopup = () => {
  const [visible, setVisible] = useState(false)

  const popup = <Popup visible={visible} onClickMask={() => setVisible(false)} />

  return {
    popup,
    show() { setVisible(true) },
    hide() { setVisible(false) },
    toggle() { setVisible(!visible) }
  }
}
