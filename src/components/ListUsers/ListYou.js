import { UserCircleIcon } from "@heroicons/react/24/outline"

export const ListUser = ({ data }) => {
  return (
    <div className="bg-neutral-300 h-20 flex items-center p-2 rounded-xl gap-1 border-2 border-emerald-400 mx-5">
      <UserCircleIcon className='w-10 h-10' />
      <div className="flex flex-col">
        <span className="text-lg font-bold">{data.username}</span>
        <span className="text-xs">ID: {data.socketId}</span>
      </div>
    </div>
  )
}
