import { useEffect, useState } from "react";
import { Container } from "../Container";

const Username = ({ setUsername, sendUsers }) => {
  const [value, setValue] = useState("");
  let error;
  let custom;
  if (value.length >= 13) {
    custom = " bg-red-500";
    error = "Username must be less than 13 characters";
  } else {
    custom = "";
    error = "";
  }

  return (
    <div className="w-full flex items-center  h-screen flex-col justify-center p-5 lg:p-0">
      <div className=" space-y-2 text-white lg:w-2/4 text-center">
        <h1 className="text-4xl text-white font-bold">Live-Chat-Project</h1>
      </div>
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={(e) => {
          e.key === "Enter" &&
            (setUsername(value), setValue(""), sendUsers(value));
        }}
        value={value}
        type="text"
        placeholder="Digite seu username"
        className="bg-zinc-100 border overflow-hidden  border-zinc-300  shadow-xl  max-h-28 m-6 w-full lg:w-2/4 py-5 pl-6 pr-14 rounded-3xl focus:outline-none"
      />

      <button
        onClick={() => (setUsername(value), setValue(""), sendUsers(value))}
        disabled={value.length >= 13}
        className={`transition-all rounded-full font-bold w-full lg:w-2/4 z-10 items-center justify-center flex  bg-emerald-400/[0.5] p-2 hover:bg-emerald-400  ${custom} `}
      >
        Entrar
      </button>
      <span className="h-14 flex items-center text-slate-50">{error}</span>
      <footer className="text-white lg:w-2/4  h-32 flex flex-col space-y-11">
        <span>
          Este projeto consiste em usar a Programação Orientada a Eventos no
          lado do servidor utilizando Node.js via socketId.
        </span>

        <span className="font-bold text-sm">
          <h3>Atenção!</h3>• Nem um dado ou se que infomação fica armazenado em
          um bando de dados!
        </span>
      </footer>
    </div>
  );
};

export default Username;
