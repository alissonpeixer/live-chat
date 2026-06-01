import { UserCircleIcon } from "@heroicons/react/24/outline"

export const MenssageFriend = ({ data }) => {
  return (
    <div className='bg-white p-4 rounded-2xl lg:w-[50%] w-[90%] px-5 py-4 shadow-2xl'>
      <div className='flex gap-2 py-2 w-full items-center'>
        <UserCircleIcon className='w-8 h-8' />
        <span className="font-semibold text-sm">{data.author}</span>
      </div>
      <p className="bg-neutral-200 p-4 rounded-xl shadow-sm break-words">
        {data.menssage}
      </p>
      {data.timestamp && (
        <div className='flex justify-end pt-2'>
          <span className="text-xs text-gray-400">{data.timestamp}</span>
        </div>
      )}
    </div>
  )
}
