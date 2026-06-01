import { getAvatarColor } from "../../utils/avatarColor"

export const MenssageFriend = ({ data }) => {
  const avatarColor = getAvatarColor(data.author)
  const initial = data.author?.[0]?.toUpperCase() || '?'

  return (
    <div className="flex items-end gap-2 max-w-[80%] lg:max-w-[60%]">

      <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center flex-shrink-0 shadow-md`}>
        <span className="text-white font-bold text-xs">{initial}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-slate-400 text-xs pl-1">{data.author}</span>
        <div className="bg-slate-700/80 backdrop-blur-sm rounded-2xl rounded-bl-sm px-4 py-3 shadow-md">
          <p className="text-white text-sm break-words leading-relaxed">{data.menssage}</p>
        </div>
        {data.timestamp && (
          <span className="text-slate-600 text-xs pl-1">{data.timestamp}</span>
        )}
      </div>

    </div>
  )
}
