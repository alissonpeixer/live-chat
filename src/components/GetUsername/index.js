import { useState } from "react"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

const MIN = 2
const MAX = 13

const Username = ({ setUsername, sendUsers }) => {
  const [value, setValue] = useState("")

  const trimmed = value.trim()
  const tooLong = value.length >= MAX
  const tooShort = trimmed.length < MIN
  const canSubmit = !tooShort && !tooLong

  const handleSubmit = () => {
    if (!canSubmit) return
    setUsername(trimmed)
    sendUsers(trimmed)
    setValue("")
  }

  return (
    <div className="w-full h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-md flex flex-col items-center gap-6">

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shadow-xl shadow-emerald-900/30">
            <span className="text-3xl">💬</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Live Chat</h1>
          <p className="text-slate-400 text-sm">Chat em tempo real com Socket.IO</p>
        </div>

        <div className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Username</label>
            <input
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              value={value}
              type="text"
              maxLength={MAX}
              placeholder="Digite seu username..."
              className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald-400/50 transition-all text-sm"
            />
            {tooLong && (
              <span className="text-red-400 text-xs">Máximo de {MAX} caracteres</span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all
              bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-900/40
              disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Entrar
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-600 text-xs text-center max-w-xs">
          Nenhum dado é armazenado em banco de dados. A sessão é perdida ao fechar a aba.
        </p>

      </div>
    </div>
  )
}

export default Username
