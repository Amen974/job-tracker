const DashboardSkeleton = () => {
  return (
    <main className="bg-main overflow-hidden text-white relative">

      <nav className="flex items-center h-20 sm:h-15 p-5 gap-2 border-b border-gray-700 relative">
        <button className="mr-2 text-gray-400 cursor-pointer hidden md:block">
          <span className="material-symbols-outlined">menu_open</span>
        </button>
        <div className="bg-green h-10 w-8 flex items-center justify-center rounded-lg cursor-pointer">
          <span className="material-symbols-outlined mt-1" style={{ fontSize: '20px', color: 'black' }}>layers</span>
        </div>
        <h1 className="font-bold text-lg">JobTracker</h1>
        <div className="absolute right-5 flex gap-1 cursor-pointer uppercase">
          <button className="text-gray-400 flex gap-0.5 items-center cursor-pointer">
            logout
            <span className="material-symbols-outlined mt-1" style={{ fontSize: '18px' }}>logout</span>
          </button>
        </div>
      </nav>

      <div className="h-full w-full flex relative">

        <nav className="hidden md:flex flex-col gap-7 text-sm overflow-hidden relative w-70 p-4 border-r border-gray-700">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-700 bg-[#223b37]">
              <span className="material-symbols-outlined text-[#20dfbf]">account_circle</span>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[#20dfbf] font-bold">Professional</p>
              <p className="text-gray-400 text-xs">Manifesting employment since 2025</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-1 items-center"><span className="material-symbols-outlined">dashboard</span><p>Dashboard</p></div>
            <div className="flex gap-1 items-center"><span className="material-symbols-outlined">work</span><p>Application</p></div>
            <div className="flex gap-1 items-center"><span className="material-symbols-outlined">event_available</span><p>Interviews</p></div>
            <div className="flex gap-1 items-center"><span className="material-symbols-outlined">verified</span><p>Offers</p></div>
          </div>
        </nav>

        <div className="animate-pulse flex flex-col flex-wrap w-full pl-5 pr-5 pt-7 pb-30 lg:pb-10 gap-5">

          {/* Title row */}
          <div className="flex flex-wrap min-h-15 gap-2">
            <div className="flex flex-col flex-1 gap-2 justify-center">
              <div className="h-8 w-64 bg-gray-700 rounded-lg" />
              <div className="h-4 w-48 bg-gray-700 rounded-lg" />
            </div>
            <div className="flex items-end">
              <div className="h-9 w-36 bg-gray-700 rounded-lg" />
            </div>
          </div>

          {/* Stat cards */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-32 w-full bg-gray-700 rounded-xl" />
            <div className="h-32 w-full bg-gray-700 rounded-xl" />
            <div className="h-32 w-full bg-gray-700 rounded-xl" />
            <div className="h-32 w-full bg-gray-700 rounded-xl" />
          </div>

          {/* Bottom section */}
          <div className="flex flex-wrap w-full gap-5 min-h-200 sm:min-h-120">
            <div className="flex-3 min-w-90 bg-gray-700 rounded-xl" />
            <div className="flex-1 min-w-60 bg-gray-700 rounded-xl" />
          </div>

        </div>
      </div>

      <nav className="w-full h-15 flex border-t border-gray-700 justify-evenly md:hidden fixed bottom-0 bg-main">
        <div className="flex flex-col justify-center items-center"><span className="material-symbols-outlined">dashboard_2</span><p>Dash</p></div>
        <div className="flex flex-col justify-center items-center"><span className="material-symbols-outlined">work</span><p>Jobs</p></div>
        <div className="flex flex-col justify-center items-center"><span className="material-symbols-outlined">event_available</span><p>Events</p></div>
        <div className="flex flex-col justify-center items-center"><span className="material-symbols-outlined">verified</span><p>Offers</p></div>
      </nav>

    </main>
  )
}

export default DashboardSkeleton