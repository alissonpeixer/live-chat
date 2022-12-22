import { UsersIcon } from "@heroicons/react/24/outline"

export const ListFriend = ({ data }) => {

  return (
    <div className="xl:bg-neutral-200 xl:h-24  flex items-center xl:p-2 rounded-xl gap-1 xl:mx-5 cursor-pointer">
      <UsersIcon className='w-6 h-6 m-4 hidden xl:block' />
      <div className="flex xl:flex-col space-y-1 items-center h-full">
        <div className={data.isTyping ? 'hidden xl:flex xl:flex-col' : 'flex flex-col'}>
          <span className="text-white text-sm  xl:text-black">{data.username}</span>
          <span className="text-xs hidden xl:block">ID: {data.socketId}</span>
        </div>
        <div className="w-full">
          <span className={data.isTyping ? 'text-xs text-white xl:hidden' : 'hidden'}>{data.username}</span>
          <span className="text-xs xl:h-7  items-center text-emerald-700 flex">{data.isTyping && `Digitando...`}</span>
        </div>
      </div>
    </div>
  )
}
