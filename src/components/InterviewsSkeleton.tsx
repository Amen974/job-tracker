
const InterviewsSkeleton = () => {
  return (
    <main className="bg-main overflow-hidden text-white relative">
      <div className="h-full w-full flex relative">

        <div className="animate-pulse flex flex-col flex-wrap w-full pl-5 pr-5 pt-7 pb-30 lg:pb-10 gap-5">

          {/* Title row */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold min-w-85">Interviews</h1>
            <p className="text-gray-400 min-w-85">Track and manage your interview pipeline.</p>
          </div>

          {/* Stat cards */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-32 w-full bg-gray-700 rounded-xl" />
            <div className="h-32 w-full bg-gray-700 rounded-xl" />
            <div className="h-32 w-full bg-gray-700 rounded-xl" />
            <div className="h-32 w-full bg-gray-700 rounded-xl" />
          </div>

          {/* Bottom section */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-[#1ab59b] rounded-full"></div>
            <h2 className="text-xl font-bold">Upcoming Interviews</h2>
          </div>

          <div className="bg-gray-700 w-full h-60 rounded-2xl"></div>
          <div className="bg-gray-700 w-full h-60 rounded-2xl"></div>
          <div className="bg-gray-700 w-full h-60 rounded-2xl"></div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-gray-700 rounded-full"></div>
            <h2 className="text-xl font-bold">Past Interviews</h2>
          </div>

          <div className="bg-gray-700 w-full h-60 rounded-2xl"></div>
          <div className="bg-gray-700 w-full h-60 rounded-2xl"></div>

        </div>
      </div>

    </main>
  )
}

export default InterviewsSkeleton