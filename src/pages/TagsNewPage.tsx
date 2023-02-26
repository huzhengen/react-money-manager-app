import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'
import { emojis } from '../lib/emojis'
import s from './TagsNewPage.module.scss'

export const TagsNewPage: React.FC = () => {
  const [emojiKind, setEmojiKind] = useState('face')
  const onSubmit = () => { }
  return (<div>
    <Gradient className='grow-0 shrink-0'>
      <TopNav title="New Tag" icon={<Icon name="back" />} />
    </Gradient>
    <form onSubmit={onSubmit} px-16px py-32px flex flex-col gap-y-8px>
      <div flex flex-col gap-y-8px>
        <span text-18px>Tag name</span>
        <input j-input-text />
        <span text-red text-12px>Tag name too long</span>
      </div>
      <div flex flex-col gap-y-8px>
        <span text-18px>Emoji <span text-24px>😀</span></span>
        <div b-1 b="#5C33BE" rounded-8px>
          <div flex p-8px gap-x-16px overflow-auto text="#999">
            {emojis.map(emoji =>
              <span whitespace-nowrap key={emoji.name}
                className={emoji.name === emojiKind ? s.selectedTag : ''}
                onClick={() => setEmojiKind(emoji.name)}>{emoji.name}</span>
            )}
          </div>
          <div text-24px p-t-8px p-b-16px h-400px overflow-auto text-center>
            {emojis.map(emoji =>
              <div key={emoji.name} style={{ display: emoji.name === emojiKind ? '' : 'none' }}
                grid grid-cols="[repeat(auto-fit,34px)]" grid-rows="[repeat(auto-fit,34px)]"
                justify-center>
                {emoji.chars.map(char => <span>{char}</span>)}
              </div>)}
          </div>
        </div>
      </div>
      <p text-center py-24px>Press and hold the tag to edit when bookkeeping</p>
      <div>
        <button j-btn>Confirm</button>
      </div>
    </form>
  </div>)
}
