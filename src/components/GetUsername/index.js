import { useState } from "react"

const MIN = 2
const MAX = 13

const Username = ({ setUsername, sendUsers }) => {
  const [value, setValue] = useState("")

  const trimmed = value.trim()
  const tooLong = value.length >= MAX
  const tooShort = trimmed.length < MIN
  const canSubmit = !tooShort && !tooLong

  const error = tooLong ? `Username deve ter menos de ${MAX} caracteres` : ""

  const handleSubmit = () => {
    if (!canSubmit) return
    setUsername(trimmed)
    sendUsers(trimmed)
    setValue("")
  }

  return (
    <div className="w-full flex items-center h-screen flex-col justify-center p-5 lg:p-0">
      <div className="space-y-2 text-white lg:w-2/4 text-center mb-4">
        <h1 className="text-4xl text-white font-bold">Live Chat</h1>
        <p className="text-neutral-400 text-sm">Chat em tempo real com Socket.IO</p>
      </div>
      <input
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSubmit()}
        value={value}
        type="text"
        maxLength={MAX}
        placeholder="Digite seu username"
        className="bg-zinc-100 border border-zinc-300 shadow-xl max-h-28 m-6 w-full lg:w-2/4 py-5 pl-6 pr-14 rounded-3xl focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`transition-all rounded-full font-bold w-full lg:w-2/4 z-10 flex items-center justify-center p-2
          ${canSubmit
            ? 'bg-emerald-400/[0.5] hover:bg-emerald-400 cursor-pointer'
            : 'bg-zinc-600 opacity-50 cursor-not-allowed'
          }`}
      >
        Entrar
      </button>
      <span className="h-8 flex items-center text-red-400 text-sm">{error}</span>
      <footer className="text-white lg:w-2/4 flex flex-col space-y-6 mt-4">
        <span className="text-neutral-300 text-sm">
          Programação orientada a eventos com Node.js e Socket.IO.
        </span>
        <span className="text-neutral-500 text-sm">
          Atenção: nenhum dado é armazenado em banco de dados.
        </span>
      </footer>
    </div>
  )
}

export default Username
