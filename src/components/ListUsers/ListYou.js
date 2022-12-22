import { UserCircleIcon } from "@heroicons/react/24/outline"

export const ListUser = ({ data }) => {
  return (
    <div className="xl:bg-neutral-300  flex items-center xl:p-2 rounded-xl gap-1 xl:border-2 border-emerald-400 xl:mx-5 cursor-pointer xl:h-20">

      <UserCircleIcon className='w-6 h-6 m-4 hidden xl:block' />
      <div className="flex items-center xl:flex-col">
        <span className="xl:text-lg font-bold text-white xl:text-black">Você</span>
        {/* <span className="text-xs">ID: {data.socketId}</span> */}
      </div>
    </div>
  )
}
