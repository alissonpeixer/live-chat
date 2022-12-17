import { useState } from "react"
import { Container } from "../Containers/Container"

const Username = ({ setUsername }) => {

  const [value, setValue] = useState('')

  return (
    <Container>

      <div className='w-full flex items-center justify-end'>
        <div className='absolute  pr-10 '>
          <button
            onClick={() =>
            (
              setUsername(value),
              setValue('')
            )

            }
            className='transition-all rounded-full font-bold  z-10 items-center justify-center flex  bg-slate-400 p-2 hover:bg-zinc-700 '>
            {/* <ArrowRightIcon className='w-6 h-6  transition-all 0 shadow-2xl   hover:stroke-slate-400' /> */}
            ENTRAR
          </button>
        </div>
        <input
          onChange={e => {
            setValue(e.target.value)
          }}
          onKeyDown={e => {
            e.key === 'Enter' &&
              (
                setUsername(value),
                setValue('')
              )

          }}
          value={value}
          type="text"
          placeholder="Digite seu username"
          className='bg-zinc-100 border overflow-hidden  border-zinc-300  shadow-xl  max-h-28 m-6 w-11/12 py-5 pl-6 pr-14 rounded-3xl focus:outline-none' />
      </div>

    </Container>
  )
}


export default Username
