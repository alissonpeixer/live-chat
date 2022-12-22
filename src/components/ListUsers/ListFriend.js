import { UsersIcon } from "@heroicons/react/24/outline"

export const ListFriend = ({ data }) => {

  return (
    <div className="bg-neutral-200 h-20 flex items-center p-2 rounded-xl gap-1">
      <UsersIcon className='w-10 h-10' />
      <div className="flex flex-col">
        <span className="text-lg font-bold">{data.username}</span>
        <span className="text-xs">ID: {data.socketId}</span>
      </div>
    </div>
  )
}
