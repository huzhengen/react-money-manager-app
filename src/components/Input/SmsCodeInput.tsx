import { useEffect, useRef, useState } from 'react'

type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}

const maxCount = 60

export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange, request } = props
  const [started, setStarted] = useState<Date>()
  const [count, setCount] = useState(maxCount)
  const timer = useRef<number>()

  useEffect(() => {
    if (started) {
      timer.current = window.setInterval(() => {
        const t = new Date()
        const seconds = Math.round((t.getTime() - started.getTime()) / 1000)
        if (maxCount - seconds < 0) {
          setStarted(undefined)
        }
        setCount(maxCount - seconds)
      }, 1000)
    } else {
      if (timer.current) {
        window.clearInterval(timer.current)
        timer.current = undefined
      }
    }
    return () => {
      if (timer.current) {
        window.clearInterval(timer.current)
        timer.current = undefined
      }
    }
  }, [started])

  const onClick = async () => {
    if (!request) { return }
    const res = await request()
    if (res) {
      setStarted(new Date())
    }
  }
  return (
    <div flex gap-x-16px>
      <input j-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)} />
      {started
        ? <button type="button" j-btn disabled bg-gray>{count}</button>
        : <button type="button" j-btn onClick={onClick}>Send Code</button>}
    </div>
  )
}
