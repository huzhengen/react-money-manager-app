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
  const [count, setCount] = useState(60)
  useEffect(() => {
    if (!started) { return }

    const timer = window.setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [started, count])

  useEffect(() => {
    if (count === 0) {
      setStarted(false)
      setCount(60)
      return
    }
    if (!started) { return }

    const timer = window.setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [count])
  const onClick = async () => {
    if (!request) { return }
    await request()
    setStarted(true)
  }
  return (
    <div flex gap-x-16px>
      <input j-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)} />
      <button type="button" j-btn onClick={onClick}>Send Code</button>
    </div>
  )
}
