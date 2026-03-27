const DashboardSkeleton = () => {
  return (
    <main className="bg-main overflow-hidden text-white relative">
      <div className="h-full w-full flex relative">
        
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

    </main>
  )
}

export default DashboardSkeleton