import { useState } from 'react'
import { ItemDate } from './ItemDate'

type Props = {
  className?: string
}

export const DateAndAmount: React.FC<Props> = (props) => {
  const [output, _setOutput] = useState('0')
  const setOutput = (str: string) => {
    const dotIndex = str.indexOf('.')
    if (dotIndex >= 0 && str.length - dotIndex > 3) { return }
    if (str.length > 16) { return }
    _setOutput(str)
  }
  const { className } = props

  const append = (char: string) => {
    switch (char) {
      case '0':
        if (output !== '0') { setOutput(output + char) }
        break
      case '.':
        if (!output.includes('.')) { setOutput(output + char) }
        break
      default:
        if (output === '0') { setOutput(char) }
        else { setOutput(output + char) }
        break
    }
  }
  const clear = () => {
    setOutput('0')
  }
  return (
    <>
      <div className={className}>
        <div flex p-t-15px p-b-16px px-16px border-t-1px border-t="#ddd" gap-x-8px items-center>
          <ItemDate />
          <code grow-1 shrink-1 text-right color="#53A867">{output}</code>
        </div>
        <div py-1px grid children-b-none children-bg-white
          grid-cols="[repeat(4,1fr)]" grid-rows="[repeat(4,56px)]" bg="#ddd" gap-1px >
          <button row-start-1 col-start-1 row-end-2 col-end-2 onClick={() => append('1')}>1</button>
          <button row-start-1 col-start-2 row-end-2 col-end-3 onClick={() => append('2')}>2</button>
          <button row-start-1 col-start-3 row-end-2 col-end-4 onClick={() => append('3')}>3</button>
          <button row-start-2 col-start-1 row-end-3 col-end-2 onClick={() => append('4')}>4</button>
          <button row-start-2 col-start-2 row-end-3 col-end-3 onClick={() => append('5')}>5</button>
          <button row-start-2 col-start-3 row-end-3 col-end-4 onClick={() => append('6')}>6</button>
          <button row-start-3 col-start-1 row-end-4 col-end-2 onClick={() => append('7')}>7</button>
          <button row-start-3 col-start-2 row-end-4 col-end-3 onClick={() => append('8')}>8</button>
          <button row-start-3 col-start-3 row-end-4 col-end-4 onClick={() => append('9')}>9</button>
          <button row-start-4 col-start-1 row-end-5 col-end-3 onClick={() => append('0')}>0</button>
          <button row-start-4 col-start-3 row-end-5 col-end-4 onClick={() => append('.')}>.</button>
          <button row-start-1 col-start-4 row-end-3 col-end-5 onClick={clear}>Empty</button>
          <button row-start-3 col-start-4 row-end-5 col-end-5
            bg="#5C33BE" text-white onClick={() => { }}>Submit</button>
        </div>
      </div>
    </>
  )
}
