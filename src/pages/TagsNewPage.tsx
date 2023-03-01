import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { TopNav } from '../components/TopNav'

export const TagsNewPage: React.FC = () => {
  const [emoji, setEmoji] = useState('😀')
  const onSubmit = () => { }
  return (<div>
    <Gradient className='grow-0 shrink-0'>
      <TopNav title="New Tag" icon={<Icon name="back" />} />
    </Gradient>
    <form onSubmit={onSubmit} px-16px py-32px flex flex-col gap-y-8px>
      <Input label='Tag name' value='' error='Tag name too long' />
      <Input type='emoji' label={<span>Tag <span text-24px>{emoji}</span></span>} value={emoji} onChange={v => setEmoji(v)} />
      <p text-center py-24px>Press and hold the tag to edit when bookkeeping</p>
      <div>
        <button j-btn>Confirm</button>
      </div>
    </form>
  </div>)
}
