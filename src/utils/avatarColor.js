const COLORS = [
  'bg-rose-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-blue-500',
  'bg-violet-500',
  'bg-pink-500',
]

export const getAvatarColor = (name = '') => {
  let hash = 0
  for (const c of name) hash += c.charCodeAt(0)
  return COLORS[hash % COLORS.length]
}
