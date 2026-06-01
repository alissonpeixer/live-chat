import { getAvatarColor } from "../../utils/avatarColor"

export const ListFriend = ({ data }) => {
  const avatarColor = getAvatarColor(data.username)
  const initial = data.username?.[0]?.toUpperCase() || '?'

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer flex-shrink-0 xl:flex-shrink">

      <div className={`relative w-9 h-9 xl:w-10 xl:h-10 rounded-full ${avatarColor} flex items-center justify-center flex-shrink-0 shadow-lg`}>
        <span className="text-white font-bold text-sm">{initial}</span>
        {data.isTyping && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
        )}
      </div>

      <div className="hidden xl:flex flex-col min-w-0">
        <span className="text-white text-sm font-medium truncate">{data.username}</span>
        <span className={`text-xs ${data.isTyping ? 'text-emerald-400' : 'text-slate-500'}`}>
          {data.isTyping ? 'digitando...' : 'online'}
        </span>
      </div>

    </div>
  )
}
