import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    const isSession = async () => {
      const token = await supabase.auth.getSession();
      if (token.data.session === null) navigate('/')
      setLoading(false);
    }
    isSession()
  }, [navigate]);

  if (loading) return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-main text-white gap-8 p-5 relative">

      <div className="absolute inset-0 opacity-10 pointer-events-none shadow-costom">
      </div>

      <div className="w-full flex flex-col items-center gap-1.5">
        <h1 className="text-2xl font-bold text-[#20dfbf]">JobTracker</h1>
        <span className="bg-green w-15 h-1.5 rounded-2xl"></span>
      </div>

      <div className="h-15 w-15 border-4 border-gray-700 border-t-[#20dfbf] rounded-full relative animate-spin"></div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-xl">Checking for active session...</p>
        <p className="max-w-xs mx-auto text-center text-gray-400">Securing your workspace and synchronizing your dashboard. This should only take a moment.</p>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <button className="cursor-pointer font-bold text-black bg-[#2c4a45] rounded-xl w-full sm:max-w-120 h-14 flex items-center gap-1 p-2"><img src="lock_green.svg" alt="lock_green" /><p className="text-sm text-gray-400">Encrypted connection active</p></button>
        <button className="cursor-pointer font-bold text-black bg-[#2c4a45] rounded-xl w-full sm:max-w-120 h-14 flex items-center gap-1 p-2"><img src="cloud_sync.svg" alt="cloud_sync" /><p className="text-sm text-gray-400">Retrieving user credentials</p></button>
      </div>

      <p className="text-gray-400 text-sm absolute bottom-10">Professional Grade Security</p>

    </main>
  )

  return <>{children}</>
}

export default ProtectedRoute