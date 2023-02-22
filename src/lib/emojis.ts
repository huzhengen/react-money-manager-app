import { emojiList } from './emojiList'

export const emojis: { name: string; chars: string[] }[] = [
  { name: 'face', chars: [] },
  { name: 'hand', chars: [] },
  { name: 'person', chars: [] },
  { name: 'animal', chars: [] },
  { name: 'plant', chars: [] },
  { name: 'food', chars: [] },
  { name: 'place', chars: [] },
  { name: 'transport', chars: [] },
  { name: 'sky', chars: [] },
  { name: 'sport', chars: [] },
]

emojiList.forEach(([name, chars]) => {
  if (name.startsWith('face') || name.endsWith('face') || name === 'emotion') {
    emojis.find(item => item.name === 'face')?.chars.push(...chars)
  } else if (name.startsWith('hand') || name === 'body-parts') {
    emojis.find(item => item.name === 'hand')?.chars.push(...chars)
  } else if (name.startsWith('person') || ['family', 'hair-style'].includes(name)) {
    emojis.find(item => item.name === 'person')?.chars.push(...chars)
  } else if (name.startsWith('animal')) {
    emojis.find(item => item.name === 'animal')?.chars.push(...chars)
  } else if (name.startsWith('plant')) {
    emojis.find(item => item.name === 'plant')?.chars.push(...chars)
  } else if (name.startsWith('food') || ['drink', 'dishware'].includes(name)) {
    emojis.find(item => item.name === 'food')?.chars.push(...chars)
  } else if (name.startsWith('place')) {
    emojis.find(item => item.name === 'place')?.chars.push(...chars)
  } else if (name.startsWith('transport') || ['hotel', 'time'].includes(name)) {
    emojis.find(item => item.name === 'transport')?.chars.push(...chars)
  } else if (['sky & weather'].includes(name)) {
    emojis.find(item => item.name === 'sky')?.chars.push(...chars)
  } else if (['sport', 'game'].includes(name)) {
    emojis.find(item => item.name === 'sport')?.chars.push(...chars)
  }
})
