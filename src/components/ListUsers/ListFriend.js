import { UsersIcon } from "@heroicons/react/24/outline"

export const ListFriend = ({ data }) => {
  return (
    <div className="xl:bg-neutral-200 xl:h-20 flex items-center xl:p-2 rounded-xl gap-1 xl:mx-5 cursor-pointer">
      <UsersIcon className='w-6 h-6 m-4 hidden xl:block flex-shrink-0' />
      <div className="flex xl:flex-col space-y-0.5 min-w-0">
        <span className="text-white text-sm xl:text-black font-medium truncate">{data.username}</span>
        {data.isTyping && (
          <span className="text-xs text-emerald-600 hidden xl:block">Digitando...</span>
        )}
      </div>
      {data.isTyping && (
        <span className="ml-1 text-emerald-400 text-xs xl:hidden">✎</span>
      )}
    </div>
  )
}
