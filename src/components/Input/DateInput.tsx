type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export const DateInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange, className } = props
  return (<div>
    <input className={className} j-input-text type="text" readOnly placeholder={placeholder}
      value={value} onChange={e => onChange?.(e.target.value)} />
  </div>)
}
