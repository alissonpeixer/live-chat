import { getAvatarColor } from "../../utils/avatarColor"

export const ListUser = ({ data, isActive, onClick }) => {
  const avatarColor = getAvatarColor(data.username)
  const initial = data.username?.[0]?.toUpperCase() || "?"

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all w-full text-left
        ${isActive ? "bg-white/10" : "hover:bg-white/5"}`}
    >
      <div className="relative w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-emerald-400/50" style={{ backgroundColor: avatarColor }}>
        <span className="text-white font-bold text-xs">{initial}</span>
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-white text-sm font-bold truncate">{data.username}</span>
        <span className="text-emerald-400 text-xs">Você</span>
      </div>
    </button>
  )
}
