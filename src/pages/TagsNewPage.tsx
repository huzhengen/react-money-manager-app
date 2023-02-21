import { useState } from 'react'
import { emojis } from '../lib/emojis'

export const TagsNewPage: React.FC = () => {
  const [emojiKind, setEmojiKind] = useState('face')
  const onSubmit = () => { }
  return (<div>
    <form onSubmit={onSubmit}>
      <div>
        <span>Tag name</span>
        <input j-input-text />
        <span text-red>Tag name too long</span>
      </div>
      <div>
        <span>Emoji 😀</span>
        <div>
          <div flex>
            {emojis.map(emoji =>
              <span key={emoji.name} onClick={() => setEmojiKind(emoji.name)}>{emoji.name}</span>
            )}
          </div>
          <div>
            {emojis.map(emoji =>
              <div key={emoji.name} style={{ display: emoji.name === emojiKind ? '' : 'none' }}>
                {emoji.chars}
              </div>)}
          </div>
        </div>
      </div>
      <p>Press and hold the tag to edit when bookkeeping</p>
      <div>
        <button j-btn>Confirm</button>
      </div>
    </form>
  </div>)
}
