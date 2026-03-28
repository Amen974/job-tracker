import type { JSX } from "react"
import { useApplications } from "../hooks/useApplications"
import type { Status } from "../types"


const Applications = () => {
  const { applications } = useApplications()

  const applayStyle = (status: Status): { style: string, span: JSX.Element } => {
    let style: string
    let span: JSX.Element
    if (status === 'Applied') {
      style = 'bg-[#20dfbf]'
      span = <span className="material-symbols-outlined text-[#20dfbf]">description</span>
    }else if (status === 'Interview') {
      style = 'bg-[#7dd3fc]'
      span = <span className="material-symbols-outlined text-[#7dd3fc]">groups</span>
    }else if (status === 'Offer') {
      style = 'bg-[#1ab59b]'
      span = <span className="material-symbols-outlined text-[#1ab59b]">verified</span>
    }else{
      style = 'bg-[#fb7185]'
      span = <span className="material-symbols-outlined text-[#fb7185]">cancel</span>
    }
    return {style, span}
  }
  
  return (
    <main className="bg-main min-h-screen text-white relative overflow-hidden flex flex-col w-full h-full pl-5 pr-5 pt-7 gap-7">

      <div className='flex flex-col gap-2'>
        <h1 className="text-3xl font-bold">Applications</h1>
        <p className="text-gray-400 text-sm">{applications.length === 0 ? 'U think about apllaying first ?' : `Tracking ${applications.length} Applications`}</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          <button className="text-gray-400 text-xs font-bold border border-gray-700 rounded-full px-5 py-2 cursor-pointer hover:text-white active:scale-95">All</button>
          <button className="text-gray-400 text-xs font-bold border border-gray-700 rounded-full px-5 py-2 cursor-pointer hover:text-white active:scale-95">APPLIED</button>
          <button className="text-gray-400 text-xs font-bold border border-gray-700 rounded-full px-5 py-2 cursor-pointer hover:text-white active:scale-95">INTERVIEW</button>
          <button className="text-gray-400 text-xs font-bold border border-gray-700 rounded-full px-5 py-2 cursor-pointer hover:text-white active:scale-95">OFFER</button>
          <button className="text-gray-400 text-xs font-bold border border-gray-700 rounded-full px-5 py-2 cursor-pointer hover:text-white active:scale-95">REJECTED</button>
        </div>

        <div className="flex flex-col gap-4">
          {applications.map((a)=>(
            <div key={a.id} className="bg-[#1ab59b]/10 min-w-full h-40 rounded-2xl border border-[#20dfbf1a] flex flex-col cursor-pointer">
              <div className="flex items-center flex-1 px-5">
                <div className="flex-1 gap-2 flex items-center">
                  {applayStyle(a.status).span}
                  <div>
                    <h1 className="font-bold text-lg uppercase">{a.company}</h1>
                    <p className="text-gray-400 text-xs uppercase">{a.role}</p>
                  </div>
                  
                </div>
                <p className={`text-xs font-semibold uppercase rounded-sm px-1 text-black ${applayStyle(a.status).style}`}>{a.status}</p>
              </div>

              <div className="flex flex-1 items-center px-5 text-gray-400">
                <div className="flex-1 text-xs flex gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', marginTop: '1px'}}>calendar_today</span>
                  <p> Applied {a.date_applied}</p>
                </div>
                <div className="flex gap-5">
                  <button className="cursor-pointer"><span className="material-symbols-outlined hover:text-white" style={{ fontSize: '16px', marginTop: '3px'}}>edit</span></button>
                  <button className="cursor-pointer"><span className="material-symbols-outlined hover:text-white  " style={{ fontSize: '16px', marginTop: '3px' }}>delete</span></button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}

export default Applications