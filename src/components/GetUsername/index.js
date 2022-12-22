import { useEffect, useState } from "react"
import { Container } from "../Container"



const Username = ({ setUsername, sendUsers }) => {

  const [value, setValue] = useState('')
  let error
  let custom
  if (value.length >= 13) {
    custom = ' bg-red-500'
    error = 'Username must be less than 13 characters'
  } else {
    custom = ''
    error = ''
  }


  return (


    <div className='w-full flex items-center  h-screen flex-col justify-center p-5 lg:p-0'>

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
        className='bg-zinc-100 border overflow-hidden  border-zinc-300  shadow-xl  max-h-28 m-6 w-full lg:w-2/4 py-5 pl-6 pr-14 rounded-3xl focus:outline-none' />

      <button
        onClick={() =>
        (
          setUsername(value),
          setValue(''),
          sendUsers(value)
        )

        }

        disabled={value.length >= 13}
        className={`transition-all rounded-full font-bold w-full lg:w-2/4 z-10 items-center justify-center flex  bg-emerald-400/[0.5] p-2 hover:bg-emerald-400  ${custom} `}>

        Entrar
      </button>
      <span className="h-14 flex items-center text-slate-50">{error}</span>
    </div>


  )
}


export default Username
