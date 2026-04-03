import { useState } from "react"
import ReactDOM from "react-dom"
import { supabase } from "../lib/supabase"
import type { Interview, Type } from "../types"

const EditInterview = ({ onClose, selectedInterview }: { onClose: () => void, selectedInterview: Interview | null }) => {

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [interviewDate, setInterviewDate] = useState<string>(selectedInterview?.interview_date ?? '')
  const [interviewTime, setInterviewTime] = useState<string>(selectedInterview?.interview_time ?? '')
  const [interviewType, setInterviewType] = useState<Type>(selectedInterview?.type ?? 'Phone')
  const [interviewNotes, setInterviewNotes] = useState<string>(selectedInterview?.notes ?? '')

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true)
    try {
      await supabase.from('interviews').update({
        interview_date: interviewDate,
        interview_time: interviewTime,
        type: interviewType,
        notes: interviewNotes
      }).eq('id', selectedInterview?.id)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
      onClose()
    }
  }

  const portalRoot = document.getElementById('portal');
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div className="inset-0 flex items-center justify-center fixed backdrop-blur-xs bg-main/90 shadow-2xl text-white">
      <div className="h-[90%] w-[90%] sm:h-180 sm:w-130 bg-[#182d2a] border border-[#20dfbf1a] rounded-xl flex flex-col">

        <div className="h-20 sm:h-15 w-full border-b border-gray-700 flex items-center pl-4 gap-2">
          <span className="material-symbols-outlined text-[#20dfbf] bg-[#20dfbf]/10 p-2 rounded-lg">edit_calendar</span>
          <p className="text-xl font-bold">Edit Interview</p>
        </div>

        <div className="flex-1 px-8 py-6 overflow-y-auto space-y-8">
          <div className="p-6 bg-[#20dfbf]/5 border border-[#20dfbf]/20 rounded-xl flex flex-col gap-5">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#20dfbf]" style={{ fontSize: '12px' }}>emergency</span>
              <h3 className="text-sm font-bold text-[#20dfbf]">Interview Details</h3>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-gray-400 text-xs uppercase">Interview Date</label>
              <input
                type="date"
                value={interviewDate}
                onChange={e => setInterviewDate(e.target.value)}
                className="bg-main rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
              />

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-xs uppercase">Interview Time</label>
                <input
                  type="time"
                  value={interviewTime}
                  onChange={e => setInterviewTime(e.target.value)}
                  className="bg-main rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-xs uppercase">Type</label>
                <select
                  value={interviewType}
                  onChange={e => setInterviewType(e.target.value as Type)}
                  className="bg-main rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
                >
                  <option>Phone</option>
                  <option>HR</option>
                  <option>Technical</option>
                  <option>Final</option>
                  <option>Onsite</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-xs uppercase">Notes (Optional)</label>
                <textarea
                  value={interviewNotes}
                  onChange={e => setInterviewNotes(e.target.value)}
                  className="bg-main rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-20 sm:h-15 w-full border-t border-gray-700 flex items-center justify-end pr-4 sm:pr-7 gap-5 sm:gap-7">
          <button onClick={onClose} className="text-gray-400 text-sm cursor-pointer">Cancel</button>
          <button onClick={handleSubmit} disabled={isSubmitting} className="flex bg-green px-6 py-3 sm:py-2 rounded-lg hover:brightness-110 font-semibold text-sm items-center cursor-pointer text-black disabled:opacity-70 gap-1">
            Save {isSubmitting && (<div className="border-4 border-white border-t-[#20dfbf] rounded-full h-4 w-4 animate-spin"></div>)}
          </button>
        </div>

      </div>
    </div>, portalRoot
  )
}

export default EditInterview