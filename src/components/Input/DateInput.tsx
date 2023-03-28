import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'
import { Datepicker } from '../Datepicker'

type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export const DateInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange, className } = props
  const { popup, toggle, hide } = usePopup({
    children: <Datepicker
      onConfirm={(d) => { onChange?.(time(d).isoString); hide() }}
      onCancel={() => hide()} />,
  })
  return (<>
    {popup}
    <input className={className} j-input-text type="text" readOnly placeholder={placeholder}
      value={value} onClick={toggle} />
  </>)
}
