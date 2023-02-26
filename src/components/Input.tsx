import { EmojiInput } from './Input/EmojiInput'

type Props = {
  label: string
  placeholder?: string
  type?: 'text' | 'emoji'
  value?: string
  onChange?: (value: string) => void
  error?: string
}

export const Input: React.FC<Props> = (props) => {
  const { label, placeholder, type = 'text', value, onChange, error } = props

  return (
    <>
      <div flex flex-col gap-y-8px>
        <span text-18px>{label}</span>
        {type === 'text'
          ? <input j-input-text type={type} placeholder={placeholder}
            value={value} onChange={e => onChange?.(e.target.value)} />
          : type === 'emoji'
            ? <EmojiInput />
            : null}
        <span text-red text-12px>{error || '\u00A0'}</span>
      </div>
    </>
  )
}
