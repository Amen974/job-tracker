import { useState } from "react"
import { useApplications } from "../hooks/useApplications"
import { useInterviews } from "../hooks/useInterviews"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const { applications,} = useApplications()
  const { interviews,} = useInterviews()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigate = useNavigate();

  const today = new Date()
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(today.getDate() - 30)
  const sixtyDaysAgo = new Date(today)
  sixtyDaysAgo.setDate(today.getDate() - 60)

  const inRange = (date: string, from: Date, to?: Date) => {
    const d = new Date(date)
    return to ? d > from && d <= to : d > from
  }

  const getStats = (status?: string) => {
    const filtered = status ? applications.filter(a => a.status === status) : applications
    return {
      thisMonth: filtered.filter(a => inRange(a.date_applied, thirtyDaysAgo)),
      lastMonth: filtered.filter(a => inRange(a.date_applied, sixtyDaysAgo, thirtyDaysAgo)),
    }
  }

  const calculatePercentageChange = (thisMonth: any[], lastMonth: any[]): number => {
    if (thisMonth.length === 0 && lastMonth.length === 0) return 0
    if (lastMonth.length === 0) return 100
    if (thisMonth.length === 0) return 0
    return Math.round(((thisMonth.length - lastMonth.length) / lastMonth.length) * 100)
  }

  const calculateInt = (thisMonth: any[], lastMonth: any[]): string => {
    const diff = thisMonth.length - lastMonth.length
    if (diff <= 0) return 'no new ones 😬'
    return `+${diff} new 🎉`
  }

  const calculateRe = (ap: any, re: any): string => {
    if (ap.thisMonth.length === 0) return 'apply to something first 💀'
    const re1 = (re.thisMonth.length / ap.thisMonth.length) * 100
    const re2 = ap.lastMonth.length === 0 ? 0 : (re.lastMonth.length / ap.lastMonth.length) * 100
    if (re1 < re2) return 'improving, keep going 📈'
    if (re1 > re2) return 'it is getting worse 📉'
    return 'have u thought of applying more? 🤔'
  }

  const ap = getStats()
  const int = getStats('Interview')
  const of = getStats('Offer')
  const re = getStats('Rejected')
  const aplyed = getStats('Applied')

  const total = ap.thisMonth.length
  const appliedPct = total === 0 ? 0 : Math.round((ap.thisMonth.filter(a => a.status === 'Applied').length / total) * 100)
  const interviewPct = total === 0 ? 0 : Math.round((int.thisMonth.length / total) * 100)
  const offerPct = total === 0 ? 0 : Math.round((of.thisMonth.length / total) * 100)
  const rejectedPct = 100 - appliedPct - interviewPct - offerPct

  const conicGradient = `conic-gradient(
    #20dfbf 0% ${appliedPct}%,
    #7dd3fc ${appliedPct}% ${appliedPct + interviewPct}%,
    #1ab59b ${appliedPct + interviewPct}% ${appliedPct + interviewPct + offerPct}%,
    #fb7185 ${appliedPct + interviewPct + offerPct}% 100%
  )`

  return (
    <main className="bg-main overflow-hidden text-white relative">

      <nav className="flex items-center h-20 sm:h-15 p-5 gap-2 border-b border-gray-700 relative">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-2 text-gray-400 cursor-pointer">
          <span className="material-symbols-outlined">
            {sidebarOpen ? 'menu_open' : 'menu'}
          </span>
        </button>
        <div className="bg-green h-10 w-8 flex items-center justify-center rounded-lg cursor-pointer"><img src="layers.svg" alt="layers" height={20} width={20} /></div>
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

        <nav className={`hidden md:flex flex-col gap-7 text-sm transition-all duration-300 overflow-hidden relative ${sidebarOpen ? 'w-70 p-4 border-r border-gray-700' : 'w-0 p-0'}`}>

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

            <div className="flex gap-1 items-center cursor-pointer">
              <span className="material-symbols-outlined">dashboard_2</span>
              <p>Dashboard</p>
            </div>

            <div className="flex gap-1 items-center cursor-pointer">
              <span className="material-symbols-outlined">work</span>
              <p>Application</p>
            </div>

            <div className="flex gap-1 items-center cursor-pointer">
              <span className="material-symbols-outlined">event_available</span>
              <p>Interviews</p>
            </div>

            <div className="flex gap-1 items-center cursor-pointer">
              <span className="material-symbols-outlined">verified</span>
              <p>Offers</p>
            </div>

          </div>

        </nav>

        <div className="flex flex-col flex-wrap w-full pl-5 pr-5 pt-7 pb-30 lg:pb-10 gap-5">

          <div className="flex flex-wrap min-h-15 gap-2">
            <div className="flex flex-col flex-1">
              <h1 className="text-3xl font-bold min-w-85">Performance Overview</h1>
              <p className="text-gray-400 min-w-85">Real-time tracking of your career progress.</p>
            </div>

            <div className="flex items-end text-black">
              <button className="flex bg-green px-4 py-2 rounded-lg hover:brightness-110 font-bold text-sm"><span className="material-symbols-outlined">add</span> New Application</button>
            </div>
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-[#182d2a] p-5 border border-[#20dfbf1a] rounded-xl">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-[#20dfbf]/10 rounded-lg">
                  <span className="material-symbols-outlined text-[#20dfbf]">description</span>
                </div>
                <span className="text-xs font-bold text-[#20dfbf] px-2 py-1 bg-[#20dfbf]/5 rounded-full border border-[#20dfbf]/20">{calculatePercentageChange(ap.thisMonth, ap.lastMonth)}%</span>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium uppercase text-gray-400">Total Applications</p>
                <h3 className="text-3xl font-bold text-white mt-1">{ap.thisMonth.length}</h3>
              </div>
              <div className="mt-2 text-xs text-gray-400">vs. {ap.lastMonth.length} last month</div>
            </div>

            <div className="bg-[#182d2a] p-5 border border-[#20dfbf1a] rounded-xl">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-[#7dd3fc]/10 rounded-lg">
                  <span className="material-symbols-outlined text-[#7dd3fc]">groups</span>
                </div>
                <span className="text-xs font-bold text-[#7dd3fc] px-2 py-1 bg-[#7dd3fc]/5 rounded-full border border-[#20dfbf]/20 text-center">{calculateInt(int.thisMonth, int.lastMonth)}</span>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium uppercase text-gray-400">Interviews</p>
                <h3 className="text-3xl font-bold text-white mt-1">{int.thisMonth.length}</h3>
              </div>
              <div className="mt-2 text-xs text-gray-400">{int.thisMonth.length > 0 ? 'Active scheduled slots' : 'no one want u :('}</div>
            </div>


            <div className="bg-[#182d2a] p-5 border border-[#20dfbf1a] rounded-xl">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-[#1ab59b]/10 rounded-lg">
                  <span className="material-symbols-outlined text-[#1ab59b]">verified</span>
                </div>
                <span className="text-xs font-bold text-[#1ab59b] px-2 py-1 bg-[#1ab59b]/5 rounded-full border border-[#20dfbf]/20">{of.thisMonth.length}</span>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium uppercase text-gray-400">Offers</p>
                <h3 className="text-3xl font-bold text-white mt-1">{of.thisMonth.length}</h3>
              </div>
              <div className="mt-2 text-xs text-gray-400">{of.thisMonth.length > 0 ? 'Pending your review' : 'hope u get one'}</div>
            </div>

            <div className="bg-[#182d2a] p-5 border border-[#20dfbf1a] rounded-xl">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-[#fb7185]/10 rounded-lg">
                  <span className="material-symbols-outlined text-[#fb7185]">cancel</span>
                </div>
                <span className="text-xs font-bold text-[#fb7185] px-2 py-1 bg-[#fb7185]/5 rounded-full border border-[#20dfbf]/20">{calculatePercentageChange(re.thisMonth, re.lastMonth)}%</span>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium uppercase text-gray-400">Rejection Rate</p>
                <h3 className="text-3xl font-bold text-white mt-1">{ap.thisMonth.length === 0 ? '0' : Math.round((re.thisMonth.length / ap.thisMonth.length) * 100)}%</h3>
              </div>
              <div className="mt-2 text-xs text-gray-400">{calculateRe(ap, re)}</div>
            </div>

          </div>

          <div className="flex flex-wrap w-full gap-5 via-gray-50 min-h-200 sm:min-h-120">

            <div className="flex-3 min-w-90 bg-[#182d2a] p-6 border border-[#20dfbf1a] rounded-xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-lg font-bold text-white">Application Statuses</h2>
                  <p className="text-sm text-gray-400">Current pipeline distribution</p>
                </div>
                <select className="bg-[#132623] border border-[#1e3a36] text-gray-400 text-xs rounded-lg px-3 py-1.5">
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>All time</option>
                </select>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-around gap-8">

                <div style={{ backgroundImage: conicGradient }} className="w-48 h-48 rounded-full flex justify-center items-center">
                  <div className="rounded-full bg-[#182d2a] w-35 h-35 flex flex-col justify-center items-center">
                    <span className="text-3xl">{ap.thisMonth.length}</span>
                    <span className="text-[10px] uppercase text-gray-400">Total</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#20dfbf]"></div>
                    <div>
                      <p className="text-xs text-gray-400">Applied</p>
                      <p className="text-sm font-bold">{aplyed.thisMonth.length} ({appliedPct}%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#7dd3fc]"></div>
                    <div>
                      <p className="text-xs text-gray-400">Interviewing</p>
                      <p className="text-sm font-bold">{int.thisMonth.length} ({interviewPct}%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#1ab59b]"></div>
                    <div>
                      <p className="text-xs text-gray-400">Offered</p>
                      <p className="text-sm font-bold">{of.thisMonth.length} ({offerPct}%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#fb7185]"></div>
                    <div>
                      <p className="text-xs text-gray-400">Rejected</p>
                      <p className="text-sm font-bold">{re.thisMonth.length} ({rejectedPct}%)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-60 bg-[#182d2a] p-5 border border-[#20dfbf1a] rounded-xl">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Upcoming</h2>
                <span className="text-[10px] font-bold text-[#20dfbf] bg-[#20dfbf]/10 px-2 py-0.5 rounded uppercase">Next</span>
              </div >
              {interviews && interviews.slice(0, 4).map((interview) => (
                <div key={interview.id} className="flex border border-[#20dfbf1a] rounded-xl bg-main p-3">
                  <div className="flex-1">
                    <h1>{interview.applications.role}</h1>
                    <p className="text-gray-400 text-sm">{interview.type} at {interview.applications.company}</p>
                  </div>

                  <div>
                    <p className="text-sm">{interview.interview_date}</p>
                    <p className="text-center text-xs text-gray-400">{interview.interview_time}</p>
                  </div>

                </div>
              ))}
              <button className="w-full mt-6 py-2 text-xs font-bold text-gray-400 border border-gray-700 rounded-lg hover:bg-[#223b37] hover:text-white uppercase cursor-pointer">
                View Full Calendar (it's empty, I know)
              </button>
            </div>

          </div>

        </div>

      </div>

      <nav className="w-full h-15 flex border-t border-gray-700 justify-evenly md:hidden fixed bottom-0 bg-main">

        <div className="flex flex-col justify-center items-center">
          <span className="material-symbols-outlined">dashboard_2</span>
          <p>Dash</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="material-symbols-outlined">work</span>
          <p>Jobs</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="material-symbols-outlined">event_available</span>
          <p>Events</p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <span className="material-symbols-outlined">verified</span>
          <p>Offers</p>
        </div>

      </nav>

    </main>
  )
}

export default Dashboard