import { CheckIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"

export const MenssageUser = ({ data }) => {
  return (
    <div className="flex items-end gap-2 max-w-[80%] lg:max-w-[60%] self-end flex-row-reverse">

      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-emerald-400/30">
        <span className="text-white font-bold text-xs">{data.author?.[0]?.toUpperCase()}</span>
      </div>

      <div className="flex flex-col gap-1 items-end">
        <span className="text-slate-400 text-xs pr-1">{data.author}</span>
        <div className="bg-emerald-600/80 backdrop-blur-sm rounded-2xl rounded-br-sm px-4 py-3 shadow-md shadow-emerald-900/30">
          <p className="text-white text-sm break-words leading-relaxed">{data.menssage}</p>
        </div>
        <div className="flex items-center gap-1 pr-1">
          {data.timestamp && (
            <span className="text-slate-600 text-xs">{data.timestamp}</span>
          )}
          {data.sent
            ? <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400" />
            : <CheckIcon className="w-3.5 h-3.5 text-slate-600" />
          }
        </div>
      </div>

    </div>
  )
}
