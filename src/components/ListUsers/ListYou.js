import { UserCircleIcon } from "@heroicons/react/24/outline"

export const ListUser = ({ data }) => {
  return (
    <div className="xl:bg-neutral-300 flex items-center xl:p-2 rounded-xl gap-1 xl:border-2 border-emerald-400 xl:mx-5 cursor-pointer xl:h-20">
      <UserCircleIcon className='w-6 h-6 m-4 hidden xl:block flex-shrink-0' />
      <div className="flex items-center xl:flex-col xl:items-start min-w-0">
        <span className="xl:text-base font-bold text-white xl:text-black truncate">{data.username}</span>
        <span className="hidden xl:block text-xs text-emerald-600 font-normal">Você</span>
      </div>
    </div>
  )
}
