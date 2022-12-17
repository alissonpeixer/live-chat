import { UserCircleIcon } from "@heroicons/react/24/outline"

export const MenssageFriend = ({ data }) => {
  console.log(data)
  return (

    <div className='bg-white p-4 rounded-2xl lg:w-[50%] w-[90%]  px-5 py-7  shadow-2xl'>
      <div className='flex gap-2 py-3 w-full items-center'>

        <UserCircleIcon className='w-10 h-10' />
        <span>{data.author}</span>

      </div>

      <p className="bg-neutral-200 p-4 rounded-xl shadow-2xl" >
        {data.menssage}
      </p>

      <div className='h-12 flex items-center text-xs'>
        Hoje, 24:55
      </div>
    </div>
  )
}
