import { useState, type JSX } from "react"
import { useApplications } from "../hooks/useApplications"
import type { Applicationstype, Filter, Status } from "../types"
import ShowAplication from "../components/ShowAplication"
import { supabase } from "../lib/supabase"
import NewAplication from "../components/NewAplication"
import ApplicationsSkeleton from "../components/ApplicationsSkeleton"


const Applications = () => {
  const { applications, loading } = useApplications()
  const [showApplication, setShowApplication] = useState<boolean>(false)
  const [selectedApplication, setSelectedApplication] = useState<Applicationstype | null>(null)
  const [isEdit, setisEdit] = useState<boolean>(false)
  const [filter, setFilter] = useState<Filter>('All')
  const [showNewAplication, SetShowNewAplication] = useState<boolean>(false)

  const applayStyle = (status: Status): { style: string, span: JSX.Element } => {
    let style: string
    let span: JSX.Element
    if (status === 'Applied') {
      style = 'bg-[#20dfbf]'
      span = <span className="material-symbols-outlined text-[#20dfbf]">description</span>
    } else if (status === 'Interview') {
      style = 'bg-[#7dd3fc]'
      span = <span className="material-symbols-outlined text-[#7dd3fc]">groups</span>
    } else if (status === 'Offer') {
      style = 'bg-[#1ab59b]'
      span = <span className="material-symbols-outlined text-[#1ab59b]">verified</span>
    } else {
      style = 'bg-[#fb7185]'
      span = <span className="material-symbols-outlined text-[#fb7185]">cancel</span>
    }
    return { style, span }
  }

  const handleDelete = async (id: string): Promise<void> => {
    const { error } = await supabase.from('applications').delete().eq('id', id);
    if (error) console.error('Delete failed:', error);
  }

  const handelFilter = (): Applicationstype[] => {
    if (filter === 'All') {
      return applications
    } else {
      return applications.filter((a) => a.status === filter)
    }
  }

  const afterFilter = handelFilter()

  return (
    <main className="bg-main min-h-screen text-white relative overflow-hidden flex flex-col w-full h-full pl-5 pr-5 pt-7 gap-7">

      {showApplication && (<ShowAplication selectedApplication={selectedApplication} onClose={() => setShowApplication(false)} />)}
      {isEdit && selectedApplication && (<NewAplication onClose={() => setisEdit(false)} isEdit={isEdit} selectedApplication={selectedApplication} />)}
      {showNewAplication && (<NewAplication onClose={() => SetShowNewAplication(false)} />)}

      <div className='flex flex-col gap-2'>
        <h1 className="text-3xl font-bold">Applications</h1>
        <p className="text-gray-400 text-sm">{applications.length === 0 ? 'U think about apllaying first ?' : `Tracking ${applications.length} Applications`}</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilter('All')} className={`text-xs font-bold border border-gray-700 rounded-full px-5 py-2 cursor-pointer active:scale-95 ${filter === 'All' ? 'bg-[#20dfbf] text-black' : 'text-gray-400 hover:text-white'}`}>All</button>
          <button onClick={() => setFilter('Applied')} className={`text-xs font-bold border border-gray-700 rounded-full px-5 py-2 cursor-pointer active:scale-95 ${filter === 'Applied' ? 'bg-[#20dfbf] text-black' : 'text-gray-400 hover:text-white'}`}>APPLIED</button>
          <button onClick={() => setFilter('Interview')} className={`text-xs font-bold border border-gray-700 rounded-full px-5 py-2 cursor-pointer active:scale-95 ${filter === 'Interview' ? 'bg-[#20dfbf] text-black' : 'text-gray-400 hover:text-white'}`}>INTERVIEW</button>
          <button onClick={() => setFilter('Offer')} className={`text-xs font-bold border border-gray-700 rounded-full px-5 py-2 cursor-pointer active:scale-95 ${filter === 'Offer' ? 'bg-[#20dfbf] text-black' : 'text-gray-400 hover:text-white'}`}>OFFER</button>
          <button onClick={() => setFilter('Rejected')} className={`text-xs font-bold border border-gray-700 rounded-full px-5 py-2 cursor-pointer active:scale-95 ${filter === 'Rejected' ? 'bg-[#20dfbf] text-black' : 'text-gray-400 hover:text-white'}`}>REJECTED</button>
        </div>

        {loading && (<ApplicationsSkeleton />)}

        <div className="flex flex-col gap-4">
          {afterFilter.map((a) => (
            <div onClick={() => { setShowApplication(true); setSelectedApplication(a) }} key={a.id} className="bg-[#1ab59b]/10 min-w-full h-40 rounded-2xl border border-[#20dfbf1a] flex flex-col cursor-pointer shadow-2xl">
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
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', marginTop: '1px' }}>calendar_today</span>
                  <p> Applied {a.date_applied}</p>
                </div>
                <div className="flex gap-5">
                  <button onClick={(e) => { e.stopPropagation(); setisEdit(true); setSelectedApplication(a) }} className="cursor-pointer"><span className="material-symbols-outlined hover:text-white" style={{ fontSize: '16px', marginTop: '3px' }}>edit</span></button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(a.id) }} className="cursor-pointer"><span className="material-symbols-outlined hover:text-white  " style={{ fontSize: '16px', marginTop: '3px' }}>delete</span></button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div onClick={()=>SetShowNewAplication(true)} className="bg-[#20dfbf] rounded-xl h-12 w-12 text-black fixed bottom-20 right-5 flex justify-center items-center cursor-pointer active:scale-95 hover:bg-[#1bf1cd]"><span className="material-symbols-outlined" style={{ fontSize: '25px' }}>add</span></div>

    </main>
  )
}

export default Applications