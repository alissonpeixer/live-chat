import { useEffect, useState } from "react"
import { Container } from "../Container"



const Username = ({ setUsername, sendUsers }) => {

  const [value, setValue] = useState('')


  return (


    <div className='w-full flex items-center  h-screen flex-col justify-center'>

      <input
        onChange={e => {
          setValue(e.target.value)
        }}
        onKeyDown={e => {
          e.key === 'Enter' &&
            (
              setUsername(value),
              setValue(''),
              sendUsers(value)
            )

        }}
        value={value}
        type="text"
        placeholder="Digite seu username"
        className='bg-zinc-100 border overflow-hidden  border-zinc-300  shadow-xl  max-h-28 m-6 w-2/4 py-5 pl-6 pr-14 rounded-3xl focus:outline-none' />

      <button
        onClick={() =>
        (
          setUsername(value),
          setValue(''),
          sendUsers(value)
        )

        }
        className='transition-all rounded-full font-bold w-2/4 z-10 items-center justify-center flex  bg-emerald-400/[0.5] p-2 hover:bg-emerald-400  '>
        {/* <ArrowRightIcon className='w-6 h-6  transition-all 0 shadow-2xl   hover:stroke-slate-400' /> */}
        Entrar
      </button>

    </div>


  )
}


export default Username
