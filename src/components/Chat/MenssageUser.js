import { UserCircleIcon, CheckIcon } from "@heroicons/react/24/outline"

export const MenssageUser = ({ data }) => {
  return (
    <div className="flex w-full flex-col pr-6 items-end">
      <div className='rounded-2xl w-[90%] lg:w-[50%] px-5 py-4 bg-neutral-300 shadow-2xl'>
        <div className='flex justify-end items-center gap-2 py-2 w-full'>
          <span className="font-semibold text-sm">{data.author}</span>
          <UserCircleIcon className='w-8 h-8' />
        </div>
        <p className="bg-neutral-200 p-4 rounded-xl shadow-sm break-words max-w-full">
          {data.menssage}
        </p>
        <div className='flex justify-between items-center pt-2'>
          {data.timestamp && (
            <span className="text-xs text-gray-500">{data.timestamp}</span>
          )}
          <CheckIcon className={`w-4 ml-auto ${data.sent ? "stroke-emerald-600" : "stroke-gray-400"}`} />
        </div>
      </div>
    </div>
  )
}
