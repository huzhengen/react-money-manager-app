import { useEffect, useState } from 'react'

type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}

export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange, request } = props
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(5)
  useEffect(() => {
    if (!started) { return }
    if (count < 0) {
      setStarted(false)
      setCount(5)
      return
    }

    const timer = window.setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [started, count])

  const onClick = async () => {
    if (!request) { return }
    const res = await request()
    if (res) {
      setStarted(true)
    }
  }
  return (
    <div flex gap-x-16px>
      <input j-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)} />
      {started
        ? <button type="button" j-btn>{count}</button>
        : <button type="button" j-btn onClick={onClick}>Send Code</button>}
    </div>
  )
}
