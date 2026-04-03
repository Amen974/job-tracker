import { useInterviews } from "../hooks/useInterviews"
import { useState } from "react"
import NewAplication from "../components/NewAplication"
import { supabase } from "../lib/supabase"
import type { Interview } from "../types"
import ShowInterview from "../components/ShowInterview"

const Interviews = () => {
  const { interviews } = useInterviews()

  const [showInterview, setShowInterview] = useState<boolean>(false)
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null)
  const [showNewAplication, SetShowNewAplication] = useState<boolean>(false)

  const today = new Date()

  const upcoming = interviews.filter(i => {
    const interviewDateTime = new Date(`${i.interview_date}T${i.interview_time}`)
    return interviewDateTime > today
  })

  const past = interviews.filter(i => {
    const interviewDateTime = new Date(`${i.interview_date}T${i.interview_time}`)
    return interviewDateTime < today
  })

  const interviewObject = {
    Phone: 0,
    HR: 0,
    Technical: 0,
    Final: 0,
    Onsite: 0,
  };

  interviews.forEach((i) => {
    const type = i.type
    interviewObject[type] += 1
  });

  const maxCount = Math.max(...Object.values(interviewObject));
  const mostCommonTypes = Object.entries(interviewObject)
    .filter(([type, count]) => count === maxCount)
    .map(([type]) => type);

  const handleDelete = async (id: string): Promise<void> => {
    const { error } = await supabase.from('interviews').delete().eq('id', id);
    if (error) console.error('Delete failed:', error);
  }



  return (
    <main className="bg-main min-h-screen text-white relative overflow-hidden flex flex-col w-full h-full pl-5 pr-5 pt-7 gap-7">
      <div className="h-full w-full flex relative">
        <div className="flex flex-col flex-wrap w-full pb-30 lg:pb-10 gap-5">

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold min-w-85">Interviews</h1>
            <p className="text-gray-400 min-w-85">Track and manage your interview pipeline.</p>
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">

            <div className="bg-[#1ab59b]/10 p-5 border border-[#20dfbf1a] rounded-xl shadow-2xl">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-[#20dfbf]/10 rounded-lg">
                  <span className="material-symbols-outlined text-[#7dd3fc]">groups</span>
                </div>

              </div>
              <div className="mt-4">
                <p className="text-xs font-medium uppercase text-gray-400">Total Interviews</p>
                <h3 className="text-3xl font-bold text-white mt-1">{interviews.length}</h3>
              </div>
            </div>

            <div className="bg-[#1ab59b]/10 p-5 border border-[#20dfbf1a] rounded-xl shadow-2xl">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-[#1ab59b]/10 rounded-lg">
                  <span className="material-symbols-outlined text-[#1ab59b]">schedule</span>
                </div>

              </div>
              <div className="mt-4">
                <p className="text-xs font-medium uppercase text-gray-400">upcoming</p>
                <h3 className="text-3xl font-bold text-white mt-1">{upcoming.length}</h3>
              </div>
            </div>


            <div className="bg-[#1ab59b]/10 p-5 border border-[#20dfbf1a] rounded-xl shadow-2xl">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-gray-400/10 rounded-lg">
                  <span className="material-symbols-outlined text-gray-400">history</span>
                </div>

              </div>
              <div className="mt-4">
                <p className="text-xs font-medium uppercase text-gray-400">past</p>
                <h3 className="text-3xl font-bold text-white mt-1">{past.length}</h3>
              </div>
            </div>

            <div className="bg-[#1ab59b]/10 p-5 border border-[#20dfbf1a] rounded-xl shadow-2xl">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-[#fbbd71]/10 rounded-lg">
                  <span className="material-symbols-outlined text-[#fbbd71]">psychology</span>
                </div>

              </div>
              <div className="mt-4">
                <p className="text-xs font-medium uppercase text-gray-400">most common</p>
                <h3 className="max-text-3xl font-bold text-white mt-1">{mostCommonTypes.join(', ')}</h3>
              </div>
            </div>

          </div>

          <div className=" flex flex-col gap-5">

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-[#1ab59b] rounded-full"></div>
              <h2 className="text-xl font-bold">Upcoming Interviews</h2>
            </div>

            <div className="flex flex-col gap-4">
              {upcoming.length === 0 ? 'NO INTERVIEW FOUND' : upcoming.map((i) => (
                <div key={i.id} onClick={() => { setShowInterview(true); setSelectedInterview(i) }} className="bg-[#1ab59b]/10 w-full min-h-60 rounded-2xl border border-[#20dfbf1a] flex flex-col cursor-pointer px-5 gap-3 shadow-2xl">
                  <div className="flex items-center flex-1">
                    <div className="flex-1 gap-2 flex items-center">
                      <span className="material-symbols-outlined text-[#7dd3fc]">apartment</span>
                      <div>
                        <h1 className="font-bold text-lg uppercase">{i.applications.company}</h1>
                        <p className="text-gray-400 text-xs uppercase">{i.applications.role}</p>
                      </div>

                    </div>
                    <p className='text-xs font-semibold uppercase rounded-sm px-1 text-black bg-[#7dd3fc]'>{i.type}</p>
                  </div>

                  <div className="bg-main flex-1 rounded-2xl px-5 py-2 flex flex-col justify-center overflow-hidden">
                    <p className="text-gray-400 text-xs font-semibold">{i.notes.length === 0 ? 'ADD NOTE ...' : i.notes}</p>
                  </div>

                  <div className="flex flex-1 items-center text-gray-400">
                    <div className="flex-1 text-xs flex gap-1">
                      <span className="material-symbols-outlined" style={{ fontSize: '14px', marginTop: '1px' }}>calendar_today</span>
                      <p>{i.interview_date} - {i.interview_time}</p>
                    </div>
                    <div className="flex gap-5">
                      <button onClick={(e) => { e.stopPropagation(); }} className="cursor-pointer"><span className="material-symbols-outlined hover:text-white" style={{ fontSize: '16px', marginTop: '3px' }}>edit</span></button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(i.id) }} className="cursor-pointer"><span className="material-symbols-outlined hover:text-white  " style={{ fontSize: '16px', marginTop: '3px' }}>delete</span></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-gray-700 rounded-full"></div>
              <h2 className="text-xl font-bold">Past Interviews</h2>
            </div>

            {past.length === 0 ? 'NO INTERVIEW FOUND' : past.map((i) => (
              <div key={i.id} onClick={() => { setShowInterview(true); setSelectedInterview(i) }} className="bg-[#1ab59b]/10 w-full min-h-40 rounded-2xl border border-[#20dfbf1a] flex flex-col cursor-pointer px-5 gap-3 shadow-2xl opacity-70">
                <div className="flex items-center flex-1">
                  <div className="flex-1 gap-2 flex items-center">
                    <span className="material-symbols-outlined text-[#7dd3fc]">apartment</span>
                    <div>
                      <h1 className="font-bold text-lg uppercase">{i.applications.company}</h1>
                      <p className="text-gray-400 text-xs uppercase">{i.applications.role}</p>
                    </div>

                  </div>
                  <p className='text-xs font-semibold uppercase rounded-sm px-1 text-black bg-[#7dd3fc]'>{i.type}</p>
                </div>

                <div className="flex flex-1 items-center text-gray-400">
                  <div className="flex-1 text-xs flex gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', marginTop: '1px' }}>calendar_today</span>
                    <p>{i.interview_date} - {i.interview_time}</p>
                  </div>
                  <div className="flex gap-5">
                    <button onClick={(e) => { e.stopPropagation(); }} className="cursor-pointer"><span className="material-symbols-outlined hover:text-white" style={{ fontSize: '16px', marginTop: '3px' }}>edit</span></button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(i.id) }} className="cursor-pointer"><span className="material-symbols-outlined hover:text-white  " style={{ fontSize: '16px', marginTop: '3px' }}>delete</span></button>
                  </div>
                </div>
              </div>
            ))}

            {showNewAplication && (<NewAplication onClose={() => SetShowNewAplication(false)} />)}
            {showInterview && (<ShowInterview selectedInterview={selectedInterview} onClose={() => setShowInterview(false)} />)}
            <div onClick={() => SetShowNewAplication(true)} className="bg-[#20dfbf] rounded-xl h-12 w-12 text-black fixed bottom-20 right-5 flex justify-center items-center cursor-pointer active:scale-95 hover:bg-[#1bf1cd]"><span className="material-symbols-outlined" style={{ fontSize: '25px' }}>add</span></div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Interviews