import { useState } from "react"
import { supabase } from "../lib/supabase"
import type { Applications, Status, Type } from "../types"
import ReactDOM from "react-dom"

const NewAplication = ({ onClose, isEdit, selectedApplication}: { onClose: () => void, isEdit?:boolean, selectedApplication?:Applications | null}) => {
  const today = new Date().toISOString().split('T')[0]

  const [company, setCompany] = useState<string>(selectedApplication?.company ?? '')
  const [role, setRole] = useState<string>(selectedApplication?.role ?? '')
  const [status, setStatus] = useState<Status>(selectedApplication?.status ?? 'Applied')
  const [dateApplied, setDateApplied] = useState<string>(selectedApplication?.date_applied ?? today)
  const [jobUrl, setJobUrl] = useState<string>(selectedApplication?.job_url ?? '')
  const [notes, setNotes] = useState<string>(selectedApplication?.notes ?? '')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const now = new Date().toTimeString().slice(0, 5)

  const [interviewDate, setInterviewDate] = useState<string>(today)
  const [interviewTime, setInterviewTime] = useState<string>(now)
  const [interviewType, setInterviewType] = useState<Type>('Phone')
  const [interviewNotes, setInterviewNotes] = useState<string>('')

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true)
    if (isEdit) {
      try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: app } = await supabase.from('applications').update({
        user_id: user?.id,
        company, role, status,
        date_applied: dateApplied,
        job_url: jobUrl,
        notes
      }).eq('id', selectedApplication?.id).select().single()

      if (status === 'Interview' && app) {
        await supabase.from('interviews').update({
          user_id: user?.id,
          application_id: app.id,
          interview_date: interviewDate,
          interview_time: interviewTime,
          type: interviewType,
          notes: interviewNotes
        }).eq('application_id', selectedApplication?.id)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
      onClose()
    }
    }else{
      try {
      const { data: { user } } = await supabase.auth.getUser()
      const { data: app } = await supabase.from('applications').insert({
        user_id: user?.id,
        company, role, status,
        date_applied: dateApplied,
        job_url: jobUrl,
        notes
      }).select().single()

      if (status === 'Interview' && app) {
        await supabase.from('interviews').insert({
          user_id: user?.id,
          application_id: app.id,
          interview_date: interviewDate,
          interview_time: interviewTime,
          type: interviewType,
          notes: interviewNotes
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
      onClose()
    }
    }
    
  }

  const portalRoot = document.getElementById('portal');
  if (!portalRoot) return null;

  return ReactDOM.createPortal (
    <div className="inset-0 flex items-center justify-center fixed backdrop-blur-xs bg-main/90 shadow-2xl text-white">
      <div className="h-[90%] w-[90%] sm:h-180 sm:w-130 bg-[#182d2a] border border-[#20dfbf1a] rounded-xl flex flex-col">

        <div className="h-20 sm:h-15 w-full border-b border-gray-700 flex items-center pl-4 gap-2">
          <span className="material-symbols-outlined text-[#20dfbf] bg-[#20dfbf]/10 p-2 rounded-lg">add_box</span>
          <p className="text-xl font-bold">New Application</p>
        </div>

        <div className="flex-1 px-8 py-6 overflow-y-auto space-y-8">

          <div className="flex gap-8 flex-wrap items-center">
            <div className="flex flex-col flex-1 gap-1">
              <label className="text-gray-400 text-xs uppercase">Company</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="bg-main rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
              />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <label className="text-gray-400 text-xs uppercase">Role</label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="bg-main rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
              />
            </div>
          </div>

          <div className="flex gap-8 items-center flex-wrap">
            <div className="flex flex-col flex-1 gap-1">
              <label className="text-gray-400 text-xs uppercase">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as Status)}
                className="bg-main flex-1 rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <label className="text-gray-400 text-xs uppercase">Date Applied</label>
              <input
                type="date"
                value={dateApplied}
                onChange={e => setDateApplied(e.target.value)}
                className="bg-main rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-xs uppercase">Job URL (Optional)</label>
            <input
              type="url"
              value={jobUrl}
              onChange={e => setJobUrl(e.target.value)}
              placeholder="https://careers.stripe.com/..."
              className="bg-main rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-xs uppercase">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="bg-main rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
            />
          </div>

          {status === 'Interview' && (
            <div className="p-6 bg-[#20dfbf]/5 border border-[#20dfbf]/20 rounded-xl flex flex-col gap-5">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#20dfbf]" style={{ fontSize: '12px' }}>emergency</span>
                <h3 className="text-sm font-bold text-[#20dfbf]">Interview Details</h3>
              </div>

              <div className="flex gap-8 items-center flex-wrap">
                <div className="flex flex-col flex-1 gap-4">
                  <label className="text-gray-400 text-xs uppercase">Interview Date</label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={e => setInterviewDate(e.target.value)}
                    className="bg-main rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
                  />
                  <div className="flex flex-col flex-1 gap-1">
                    <label className="text-gray-400 text-xs uppercase">Interview Time</label>
                    <input
                      type="time"
                      value={interviewTime}
                      onChange={e => setInterviewTime(e.target.value)}
                      className="bg-main rounded-sm px-2 py-2 border border-[#20dfbf1a] text-sm outline-none focus:border-[#20dfbf]"
                    />
                  </div>

                  <div className="flex flex-col flex-1 gap-1">
                    <label className="text-gray-400 text-xs uppercase">type</label>
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
          )}

        </div>

        <div className="h-20 sm:h-15 w-full border-t border-gray-700 flex items-center justify-end pr-4 sm:pr-7 gap-5 sm:gap-7">
          <button onClick={onClose} className="text-gray-400 text-sm cursor-pointer">Cancel</button>
          <button onClick={handleSubmit} disabled={isSubmitting} className="flex bg-green px-6 py-3 sm:py-2 rounded-lg hover:brightness-110 font-semibold text-sm items-center cursor-pointer text-black disabled:opacity-70 gap-1">{isEdit ? 'Save' : 'Add Application'} {isSubmitting && (<div className="border-4 border-white border-t-[#20dfbf] rounded-full h-4 w-4 animate-spin"></div>)}</button>
        </div>

      </div>
    </div>,
    portalRoot
  )
}

export default NewAplication