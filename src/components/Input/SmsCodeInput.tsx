type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}

export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange, request } = props
  const onClick = async () => {
    if (!request) { return }
    await request()
  }
  return (
    <div flex gap-x-16px>
      <input j-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)} />
      <button type="button" j-btn onClick={onClick}>Send Code</button>
    </div>
  )
}
