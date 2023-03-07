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
  const clearTimer = () => {
    if (timer.current) {
      window.clearInterval(timer.current)
      timer.current = undefined
    }
  }
  useEffect(() => {
    if (!started) {
      clearTimer()
      return
    }
    timer.current = window.setInterval(() => {
      const seconds = Math.round((new Date().getTime() - started.getTime()) / 1000)
      const count = maxCount - seconds
      if (count < 0) { setStarted(undefined) }
      setCount(count)
    }, 1000)
    return clearTimer
  }, [started])

  const onClick = async () => {
    if (!request) { return }
    const res = await request()
    setStarted(new Date())
    if (res) {
      // setStarted(new Date())
    }
  }
  return (
    <div flex gap-x-16px>
      <input j-input-text type="text" placeholder={placeholder}
        value={value} onChange={e => onChange?.(e.target.value)} />
      {started
        ? <button type="button" j-btn disabled bg-gray>{count}s</button>
        : <button type="button" j-btn onClick={onClick}>Send Code</button>}
    </div>
  )
}
