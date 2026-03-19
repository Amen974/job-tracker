import { useState } from "react"
import type { FormEvent } from "react"
import { supabase } from '../lib/supabase'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setpassword] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const navigate = useNavigate();

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      const {error} = await supabase.auth.signInWithPassword({ email: email, password: password });
      if(!error) navigate('/Dashboard')
      if(error) setErrorMsg(error.message)
    }else{
      const {error} = await supabase.auth.signUp({ email: email, password: password })
      if(!error) navigate('/Dashboard')
      if(error) setErrorMsg(error.message)
    }
  }
  console.log(errorMsg);
  return (
    <main className="h-screen w-full flex flex-col bg-main text-white overflow-hidden">

      <div className="flex items-center h-20 sm:h-15 p-5 gap-2 border-b border-gray-700">
        <div className="bg-green h-10 w-8 flex items-center justify-center rounded-lg cursor-pointer"><img src="layers.svg" alt="layers" height={20} width={20} /></div>
        <h1 className="font-bold text-lg">JobTracker</h1>
      </div>

      <div className="flex flex-col items-center justify-center h-155">
        <div className="flex flex-col p-4 sm:p-7 sm:w-165 gap-7 w-full">
          <div className="flex flex-col items-center gap-1">
            {isLogin ? (
              <h1 className="text-3xl font-extrabold">Welcome Back</h1>
            ) : (<h1 className="text-3xl font-extrabold">Welcome</h1>)}
            <p className="text-slate-400 text-sm">Streamline your search and land your dream role.</p>
          </div>

          {errorMsg &&(
            <div className="bg-[#4c0519] rounded-xl p-3 border border-[#881337] flex gap-1 justify-center">
            <img src="error.svg" alt="error" /><p className="text-[#fb7185]">{errorMsg}</p>
          </div>
          )}

          <div className="border border-b border-gray-700 rounded-xl flex w-full sm:w-150 h-11">
            <button onClick={() => setIsLogin(true)} className={`cursor-pointer flex-1 font-semibold text-gray-400  rounded-xl hover:opacity-90 ${isLogin && 'text-black! bg-green'}`}>Login</button>
            <button onClick={() => setIsLogin(false)} className={`cursor-pointer flex-1 font-semibold text-gray-400 rounded-xl hover:opacity-90 ${!isLogin && 'text-black! bg-green'}`}>Register</button>
          </div>

          <form onSubmit={handelSubmit} className="flex flex-col gap-2">

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="ml-1">Email Address</label>
              <div className={`flex items-center border  rounded-xl w-full h-11 p-3 gap-2 ${errorMsg ? ' border-[#fb7185]' : 'border-gray-700'}`}>
                <img src="mail.svg" alt="mail" height={20} width={20} />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@companie.com"
                  className="w-full mb-1 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label htmlFor="password" className="ml-1">Password</label>
              <div className={`flex items-center border  rounded-xl w-full h-11 p-3 gap-2 ${errorMsg ? ' border-[#fb7185]' : 'border-gray-700'}`}>
                <img src="lock.svg" alt="lock" height={20} width={20} />
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full outline-none"
                />
              </div>
            </div>

            {isLogin 
              ? <button className="cursor-pointer font-bold text-black bg-green rounded-xl w-full h-12" type="submit">Sign In</button> 
              : <button className="cursor-pointer font-bold text-black bg-green rounded-xl w-full h-12" type="submit">Register</button>
            }
            
          </form>

            {isLogin 
              ? <p className="text-center text-gray-400 text-sm">Don't have an account? <button onClick={()=>setIsLogin(false)} className="text-[#20dfbf] font-semibold cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-150">Create an account</button></p> 
              : <p className="text-center text-gray-400 text-sm">Already have an account? <button onClick={()=>setIsLogin(true)} className="text-[#20dfbf] font-semibold cursor-pointer hover:opacity-90 active:scale-95 transition-all duration-150">Log in</button></p>
            }

        </div>

      </div>

      <div className="border-t border-gray-700 flex justify-center items-center flex-1">
        <p className="text-sm text-gray-400">© 2026 JobTracker — Built by someone desperately seeking employment.</p>
      </div>
    </main>
  )
}

export default Login