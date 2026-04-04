import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const navigate = useNavigate();
  const location = useLocation()
  return (
    <main className="bg-main min-h-screen text-white relative">

      <nav className="flex items-center h-20 sm:h-15 p-5 gap-2 border-b border-gray-700 relative">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2 text-gray-400 cursor-pointer hidden md:block">
          <span className="material-symbols-outlined">
            {sidebarOpen ? 'menu_open' : 'menu'}
          </span>
        </button>
        <div className="bg-green h-10 w-8 flex items-center justify-center rounded-lg cursor-pointer"><span className="material-symbols-outlined mt-1" style={{ fontSize: '22px', color: 'black' }}>layers</span></div>
        <h1 className="font-bold text-lg">JobTracker</h1>
        <div className="absolute right-5 flex gap-1 cursor-pointer uppercase">
          <button
            onClick={async () => {
              await supabase.auth.signOut()
              navigate('/')
            }}
            className="text-gray-400 flex gap-0.5 items-center cursor-pointer hover:text-[#20dfbf] transition-colors"
          >
            logout
            <span className="material-symbols-outlined mt-1" style={{ fontSize: '18px' }}>logout</span>
          </button>
        </div>
      </nav>

      <div className="h-full w-full flex relative">

        <aside className={`hidden md:flex flex-col gap-7 text-sm transition-all duration-300 overflow-hidden relative ${sidebarOpen ? 'w-70 p-4 border-r border-gray-700' : 'w-0 p-0'}`}>

          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-700 bg-[#223b37]">
              <span className="material-symbols-outlined text-[#20dfbf]">account_circle</span>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-[#20dfbf] font-bold">Professional</p>
              <p className="text-gray-400 text-xs">Manifesting employment since 2025</p>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">

            <div onClick={() => navigate('/Dashboard')} className={`flex gap-1 items-center cursor-pointer hover:text-[#20dfbf] h-10 pl-2 active:scale-95 ${location.pathname === '/Dashboard' && 'bg-[#182d2a] text-[#20dfbf] border-r-2 border-r-[#20dfbf]'}`}>
              <span className="material-symbols-outlined">dashboard</span>
              <p>Dashboard</p>
            </div>

            <div onClick={() => navigate('/Applications')} className={`flex gap-1 items-center cursor-pointer hover:text-[#20dfbf] h-10 pl-2 active:scale-95 ${location.pathname === '/Applications' && 'bg-[#182d2a] text-[#20dfbf] border-r-2 border-r-[#20dfbf]'}`}>
              <span className="material-symbols-outlined">work</span>
              <p>Application</p>
            </div>

            <div onClick={() => navigate('/Interviews')} className={`flex gap-1 items-center cursor-pointer hover:text-[#20dfbf] h-10 pl-2 active:scale-95 ${location.pathname === '/Interviews' && 'bg-[#182d2a] text-[#20dfbf] border-r-2 border-r-[#20dfbf]'}`}>
              <span className="material-symbols-outlined">event_available</span>
              <p>Interviews</p>
            </div>

          </div>

        </aside>

        <div className='flex-1 min-w-70'>
          <Outlet />
        </div>

      </div>

      <nav className="w-full h-15 flex border-t border-gray-700 justify-evenly md:hidden fixed bottom-0 bg-main">

        <div  onClick={() => navigate('/Dashboard')} className={`flex flex-col justify-center items-center ${location.pathname === '/Dashboard' && 'text-[#20dfbf]'}`}>
          <span className="material-symbols-outlined">dashboard_2</span>
          <p>Dash</p>
        </div>

        <div onClick={() => navigate('/Applications')} className={`flex flex-col justify-center items-center ${location.pathname === '/Applications' && 'text-[#20dfbf]'}`}>
          <span className="material-symbols-outlined">work</span>
          <p>Jobs</p>
        </div>

        <div onClick={() => navigate('/Interviews')} className={`flex flex-col justify-center items-center ${location.pathname === '/Interviews' && 'text-[#20dfbf]'}`}>
          <span className="material-symbols-outlined">event_available</span>
          <p>Events</p>
        </div>

      </nav>

    </main>
  )
}

export default Layout