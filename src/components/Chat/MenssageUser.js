import { UserCircleIcon, CheckIcon } from "@heroicons/react/24/outline"

export const MenssageUser = ({ data, sendState }) => {
  return (
    <div className="flex w-full flex-col pr-6 items-end " >

      <div className='rounded-2xl w-[90%]  lg:w-[50%] rounded-tl-2xl lg:ml-16 px-5 py-7 bg-neutral-300 shadow-2xl'>
        <div className='flex justify-end items-center gap-2 py-3 w-full '>

          <UserCircleIcon className='w-10 h-10' />
          <span>{data.author}</span>


        </div>
        <p className="bg-neutral-200 p-4 rounded-xl shadow-2xl">
          {data.menssage}

        </p>

        <div className='h-12 flex items-center text-xs gap-3'>
          Hoje, 24:55
          <CheckIcon className={sendState ? "w-4 stroke-emerald-600" : "w-4 "} />
        </div>
      </div>
    </div>
  )
}
