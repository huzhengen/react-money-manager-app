import { emojiList } from './emojiList'

export const emojis: { name: string; chars: string[] }[] = [
  { name: 'face', chars: [] },
  { name: 'hand', chars: [] }
]

emojiList.forEach(([name, chars]) => {
  if (name.startsWith('face')) {
    emojis.find(emoji => emoji.name === 'face')?.chars.push(...chars)
  } else if (name.startsWith('hand')) {
    emojis.find(emoji => emoji.name === 'hand')?.chars.push(...chars)
  }
})
