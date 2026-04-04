import ReactDOM from "react-dom"
import type { Applicationstype } from "../types";
import { useInterviews } from "../hooks/useInterviews";

const ShowAplication = ({ selectedApplication, onClose }: { selectedApplication: Applicationstype | null, onClose: () => void }) => {
  const { interviews } = useInterviews()

  const interview = interviews.find((i) => i.application_id === selectedApplication?.id)

  const portalRoot = document.getElementById('portal');
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div className="inset-0 flex items-center justify-center fixed backdrop-blur-xs bg-main/90 shadow-2xl text-white">
      <div className="h-[90%] w-[90%] sm:h-180 sm:w-130 bg-[#182d2a] border border-[#20dfbf1a] rounded-xl flex flex-col">

        <div className="h-20 sm:h-15 w-full border-b border-gray-700 flex items-center pl-4 gap-2 relative">
          <span className="material-symbols-outlined text-[#20dfbf]">description</span>
          <p className="text-xl font-bold">Application Details</p>
          <button onClick={onClose} className="absolute right-4 mt-1.5 cursor-pointer"><span className="material-symbols-outlined text-gray-400" style={{ fontSize: '18px' }}>close</span></button>
        </div>

        <div className="flex-1 px-8 py-6 overflow-y-auto space-y-8">

          <div className="flex gap-8 flex-wrap items-center">
            <div className="flex flex-col flex-1 gap-1">
              <label className="text-gray-400 text-xs uppercase">Company</label>
              <div className="bg-main px-4 py-1.5 rounded-lg border border-[#20dfbf]">{selectedApplication?.company}</div>
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <label className="text-gray-400 text-xs uppercase">Role</label>
              <div className="bg-main px-4 py-1.5 rounded-lg border border-[#20dfbf]">{selectedApplication?.role}</div>
            </div>
          </div>

          <div className="flex gap-8 items-center flex-wrap">
            <div className="flex flex-col flex-1 gap-1">
              <label className="text-gray-400 text-xs uppercase">Status</label>
              <div className="bg-main px-4 py-1.5 rounded-lg border border-[#20dfbf]">{selectedApplication?.status}</div>
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <label className="text-gray-400 text-xs uppercase">Date Applied</label>
              <div className="bg-main px-4 py-1.5 rounded-lg border border-[#20dfbf]">{selectedApplication?.date_applied}</div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-xs uppercase">Job URL</label>
            <a className="bg-main px-4 py-1.5 rounded-lg border border-[#20dfbf] min-h-10">{selectedApplication?.job_url}</a>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-gray-400 text-xs uppercase">Notes</label>
            <div className="bg-main px-4 py-1.5 rounded-lg border border-[#20dfbf] text-sm min-h-25">{selectedApplication?.notes}</div>
          </div>

          {selectedApplication?.status === 'Interview' && (
            <div className="p-6 bg-[#20dfbf]/5 border border-[#20dfbf]/20 rounded-xl flex flex-col gap-5">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[#20dfbf]" style={{ fontSize: '12px' }}>emergency</span>
                <h3 className="text-sm font-bold text-[#20dfbf]">Interview Details</h3>
              </div>

              <div className="flex gap-8 items-center flex-wrap">
                <div className="flex flex-col flex-1 gap-4">
                  <label className="text-gray-400 text-xs uppercase">Interview Date</label>
                  <div className="bg-main px-4 py-1.5 rounded-lg border border-[#20dfbf]">{interview?.interview_date}</div>
                  <div className="flex flex-col flex-1 gap-1">
                    <label className="text-gray-400 text-xs uppercase">Interview Time</label>
                    <div className="bg-main px-4 py-1.5 rounded-lg border border-[#20dfbf]">{interview?.interview_time}</div>
                  </div>

                  <div className="flex flex-col flex-1 gap-1">
                    <label className="text-gray-400 text-xs uppercase">type</label>
                    <div className="bg-main px-4 py-1.5 rounded-lg border border-[#20dfbf]">{interview?.type}</div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-xs uppercase">Notes</label>
                    <div className="bg-main px-4 py-1.5 rounded-lg border border-[#20dfbf] text-sm min-h-25">{interview?.notes}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>


        <div>

        </div>

      </div>
    </div>,
    portalRoot
  )
}

export default ShowAplication