const COLORS = [
  '#f43f5e', // rose
  '#f97316', // orange
  '#f59e0b', // amber
  '#10b981', // emerald
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
]

export const getAvatarColor = (name = '') => {
  let hash = 0
  for (const c of name) hash += c.charCodeAt(0)
  return COLORS[hash % COLORS.length]
}
