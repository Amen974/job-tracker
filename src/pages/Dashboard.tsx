import { useState } from "react"
import { useApplications } from "../hooks/useApplications"
import { useInterviews } from "../hooks/useInterviews"
import NewAplication from "../components/NewAplication";
import type { Applicationstype, ChartDate, GetStats } from "../types";
import DashboardSkeleton from "../components/DashboardSkeleton";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {
  const { applications, loading: apLoading} = useApplications()
  const { interviews, loading: intLoading} = useInterviews()
  const [showNewAplication, SetShowNewAplication] = useState<boolean>(false)
  const [dateShow, SetDateShow] = useState<ChartDate>('This Month')

  const today = new Date()

  const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)

   const navigate = useNavigate();

  const inRange = (date: string, from: Date, to?: Date): boolean => {
    const d = new Date(date)
    return to ? d > from && d <= to : d > from
  }

  const getStats = (status?: string):GetStats => {
    const filtered = status ? applications.filter(a => a.status === status) : applications
    return {
      thisMonth: filtered.filter(a => inRange(a.date_applied, startOfThisMonth)),
      lastMonth: filtered.filter(a => inRange(a.date_applied, startOfLastMonth, startOfThisMonth)),
    }
  }

  const calculatePercentageChange = (thisMonth: Applicationstype[], lastMonth: Applicationstype[]): number => {
    if (thisMonth.length === 0 && lastMonth.length === 0) return 0
    if (lastMonth.length === 0) return 100
    if (thisMonth.length === 0) return 0
    return Math.round(((thisMonth.length - lastMonth.length) / lastMonth.length) * 100)
  }

  const calculateInt = (thisMonth: Applicationstype[], lastMonth: Applicationstype[]): string => {
    const diff = thisMonth.length - lastMonth.length
    if (diff <= 0) return 'no new ones 😬'
    return `+${diff} new 🎉`
  }

  const calculateRe = (ap: GetStats, re: GetStats): string => {
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

  const getChartData = (status?: string): Applicationstype[] => {
    const filtered = status ? applications.filter(a => a.status === status) : applications
    if (dateShow === 'Last Month') return filtered.filter(a => inRange(a.date_applied, startOfLastMonth))
    if (dateShow === 'All time') return filtered.filter(a => inRange(a.date_applied, new Date(0)))
    return filtered.filter(a => inRange(a.date_applied, startOfThisMonth))
  }

  const chartAp = getChartData()
  const chartAplyed = getChartData('Applied')
  const chartInt = getChartData('Interview')
  const chartOf = getChartData('Offer')
  const chartRe = getChartData('Rejected')

  const total = chartAp.length
  const appliedPct = total === 0 ? 0 : Math.round((chartAplyed.length / total) * 100)
  const interviewPct = total === 0 ? 0 : Math.round((chartInt.length / total) * 100)
  const offerPct = total === 0 ? 0 : Math.round((chartOf.length / total) * 100)
  const rejectedPct = total === 0 ? 0 : 100 - appliedPct - interviewPct - offerPct

  const upcoming = interviews.filter(i => {
    const interviewDateTime = new Date(`${i.interview_date}T${i.interview_time}`)
    return interviewDateTime > today
  })

  const conicGradient = `conic-gradient(
    #20dfbf 0% ${appliedPct}%,
    #7dd3fc ${appliedPct}% ${appliedPct + interviewPct}%,
    #1ab59b ${appliedPct + interviewPct}% ${appliedPct + interviewPct + offerPct}%,
    #fb7185 ${appliedPct + interviewPct + offerPct}% 100%
  )`

  return (
    <>
    {apLoading || intLoading ? (<DashboardSkeleton/>) : (
      <main className="bg-main min-h-screen text-white relative">

      {showNewAplication && (
        <NewAplication onClose={() => SetShowNewAplication(false)} />
      )}

      <div className="h-full w-full flex relative">

        <div className="flex flex-col flex-wrap w-full pl-5 pr-5 pt-7 pb-30 lg:pb-10 gap-5">

          <div className="flex flex-wrap min-h-15 gap-2">
            <div className="flex flex-col flex-1">
              <h1 className="text-3xl font-bold min-w-85">Performance Overview</h1>
              <p className="text-gray-400 min-w-85">Real-time tracking of your career progress.</p>
            </div>

            <div onClick={() => SetShowNewAplication(true)} className="flex items-end text-black">
              <button className="flex bg-green px-4 py-2 rounded-lg hover:brightness-110 font-bold text-sm items-center cursor-pointer"><span className="material-symbols-outlined" style={{ fontSize: '16px', marginTop: '3px' }}>add</span> New Application</button>
            </div>
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">

            <div className="bg-[#1ab59b]/10 p-5 border border-[#20dfbf1a] rounded-xl shadow-2xl">
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

            <div className="bg-[#1ab59b]/10 p-5 border border-[#20dfbf1a] rounded-xl shadow-2xl">
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


            <div className="bg-[#1ab59b]/10 p-5 border border-[#20dfbf1a] rounded-xl shadow-2xl">
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

            <div className="bg-[#1ab59b]/10 p-5 border border-[#20dfbf1a] rounded-xl shadow-2xl">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-[#fb7185]/10 rounded-lg">
                  <span className="material-symbols-outlined text-[#fb7185]">cancel</span>
                </div>
                <span className="text-xs font-bold text-[#fb7185] px-2 py-1 bg-[#fb7185]/5 rounded-full border border-[#20dfbf]/20">{re.thisMonth.length}</span>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium uppercase text-gray-400">Rejection Rate</p>
                <h3 className="text-3xl font-bold text-white mt-1">{ap.thisMonth.length === 0 ? '0' : Math.round((re.thisMonth.length / ap.thisMonth.length) * 100)}%</h3>
              </div>
              <div className="mt-2 text-xs text-gray-400">{calculateRe(ap, re)}</div>
            </div>

          </div>

          <div className="flex flex-wrap w-full gap-5 via-gray-50 min-h-200 sm:min-h-120">

            <div className="flex-3 w-full bg-[#1ab59b]/10 p-6 border border-[#20dfbf1a] rounded-xl shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-lg font-bold text-white">Application Statuses</h2>
                  <p className="text-sm text-gray-400">Current pipeline distribution</p>
                </div>
                <select className="bg-[#132623] border border-[#1e3a36] text-gray-400 text-xs rounded-lg px-3 py-1.5 " value={dateShow} onChange={e => SetDateShow(e.target.value as ChartDate)}>
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>All time</option>
                </select>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-around gap-8">

                <div style={{ backgroundImage: conicGradient }} className="w-48 h-48 rounded-full flex justify-center items-center">
                  <div className="rounded-full bg-[#182d2a] w-35 h-35 flex flex-col justify-center items-center">
                    <span className="text-3xl">{chartAp.length}</span>
                    <span className="text-[10px] uppercase text-gray-400">Total</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#20dfbf]"></div>
                    <div>
                      <p className="text-xs text-gray-400">Applied</p>
                      <p className="text-sm font-bold">{chartAplyed.length} ({appliedPct}%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#7dd3fc]"></div>
                    <div>
                      <p className="text-xs text-gray-400">Interviewing</p>
                      <p className="text-sm font-bold">{chartInt.length} ({interviewPct}%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#1ab59b]"></div>
                    <div>
                      <p className="text-xs text-gray-400">Offered</p>
                      <p className="text-sm font-bold">{chartOf.length} ({offerPct}%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#fb7185]"></div>
                    <div>
                      <p className="text-xs text-gray-400">Rejected</p>
                      <p className="text-sm font-bold">{chartRe.length} ({rejectedPct}%)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-60 bg-[#1ab59b]/10 p-5 border border-[#20dfbf1a] rounded-xl shadow-2xl">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Upcoming</h2>
                <span className="text-[10px] font-bold text-[#20dfbf] bg-[#20dfbf]/10 px-2 py-0.5 rounded uppercase">Next</span>
              </div >
              <div className="flex flex-col gap-4">
                {upcoming && upcoming.slice(0, 4).map((interview) => (
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
              </div>

              <button onClick={() => navigate('/Interviews')} className="w-full mt-6 py-2 text-xs font-bold text-gray-400 border border-gray-700 rounded-lg hover:bg-[#223b37] hover:text-white uppercase cursor-pointer">
                View Full Calendar {upcoming.length === 0 && ('(its empty, I know)')}
              </button>
            </div>

          </div>

        </div>

      </div>

    </main>
    )}
    
    </>
  )
}

export default Dashboard