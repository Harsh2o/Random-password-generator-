import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")


  const passRef = useRef()
  const generatePassword=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(characterAllowed) str+="!@#$%^&*()_+"

    for(let i=1;i<length;i++){
      const char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,characterAllowed])

  useEffect(()=>{
    generatePassword()

  },[length,numberAllowed,characterAllowed])

  const copyPass=()=>{
    window.navigator.clipboard.writeText(password)
    passRef.current.select()
  }

  

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/30 p-6">
        <div className="mb-5">
          <h1 className="text-center text-xl sm:text-2xl font-semibold tracking-tight text-white">
            Password Generator
          </h1>
          <p className="text-center text-xs sm:text-sm text-slate-300 mt-1">
            Adjust length and options, then copy.
          </p>
        </div>

        <div className="flex items-stretch gap-2 rounded-xl bg-black/30 border border-white/10 p-2 mb-5">
          <input
            type="text"
            value={password}
            className="w-full bg-transparent text-slate-100 placeholder:text-slate-400 px-3 py-2 outline-none text-sm sm:text-base"
            placeholder="Your password will appear here"
            readOnly
            ref={passRef}
          />
          <button
          onClick={copyPass}
            className="shrink-0 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          >
            Copy
          </button>
        </div>

        <div className="grid gap-4">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-slate-200 text-sm font-medium">Length</span>
              <span className="text-slate-100 text-sm tabular-nums px-2 py-1 rounded-md bg-white/10 border border-white/10">
                {length}
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-full cursor-pointer accent-blue-500"
              onChange={(e) => { setLength(Number(e.target.value)) }}
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <label className="flex items-center gap-2 text-slate-200 text-sm select-none" htmlFor="numberInput">
                <input
                  type="checkbox"
                  checked={numberAllowed}
                  id="numberInput"
                  className="h-4 w-4 accent-blue-500"
                  onChange={() => {
                    setNumberAllowed((prev) => !prev);
                  }}
                />
                Numbers
              </label>

              <label className="flex items-center gap-2 text-slate-200 text-sm select-none" htmlFor="characterInput">
                <input
                  type="checkbox"
                  checked={characterAllowed}
                  id="characterInput"
                  className="h-4 w-4 accent-blue-500"
                  onChange={() => {
                    setCharacterAllowed((prev) => !prev)
                  }}
                />
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App