import { emojiList } from './emojiList'

export const emojis: { name: string; chars: string[] }[] = [
  { name: '表情', chars: [] },
  { name: '手势', chars: [] },
  { name: '人物', chars: [] },
  { name: '动物', chars: [] },
  { name: '植物', chars: [] },
  { name: '食物', chars: [] },
  { name: '场所', chars: [] },
  { name: '交通', chars: [] },
  { name: '自然', chars: [] },
  { name: '运动', chars: [] },
]

emojiList.forEach(([name, chars]) => {
  if (name.startsWith('face') || name.endsWith('face') || name === 'emotion') {
    emojis.find(item => item.name === '表情')?.chars.push(...chars)
  } else if (name.startsWith('hand') || name === 'body-parts') {
    emojis.find(item => item.name === '手势')?.chars.push(...chars)
  } else if (name.startsWith('person') || ['family', 'hair-style'].includes(name)) {
    emojis.find(item => item.name === '人物')?.chars.push(...chars)
  } else if (name.startsWith('animal')) {
    emojis.find(item => item.name === '动物')?.chars.push(...chars)
  } else if (name.startsWith('plant')) {
    emojis.find(item => item.name === '植物')?.chars.push(...chars)
  } else if (name.startsWith('food') || ['drink', 'dishware'].includes(name)) {
    emojis.find(item => item.name === '食物')?.chars.push(...chars)
  } else if (name.startsWith('place')) {
    emojis.find(item => item.name === '场所')?.chars.push(...chars)
  } else if (name.startsWith('transport') || ['hotel', 'time'].includes(name)) {
    emojis.find(item => item.name === '交通')?.chars.push(...chars)
  } else if (['sky & weather'].includes(name)) {
    emojis.find(item => item.name === '自然')?.chars.push(...chars)
  } else if (['sport', 'game'].includes(name)) {
    emojis.find(item => item.name === '运动')?.chars.push(...chars)
  }
})
