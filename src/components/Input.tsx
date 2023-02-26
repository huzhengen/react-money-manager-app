type Props = {
  label: string
  placeholder?: string
  type?: 'text'
  value?: string
  onChange?: (value: string) => void
  error?: string
}

export const Input: React.FC<Props> = (props) => {
  const { label, placeholder, type, value, onChange, error } = props
  return (
    <div flex flex-col gap-y-8px>
      <span text-18px>{label}</span>
      <input j-input-text type={type} placeholder={placeholder} value={value}
        onChange={e => onChange?.(e.target.value)} />
      <span text-red text-12px>{error || '\u00A0'}</span>
    </div>
  )
}

