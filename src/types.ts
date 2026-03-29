export type Status = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export type Applicationstype = {
  id: string;
  user_id: string;
  company: string;
  role: string;
  status: Status;
  date_applied: string;
  job_url: string;
  notes: string;
  created_at: string;
}

export type Type = 'Phone' | 'HR' | 'Technical' | 'Final' | 'Onsite';

export type Interview = {
  id: string;
  application_id: string;
  user_id: string;
  interview_date: string;
  interview_time: string;
  type: Type;
  notes: string;
  created_at: string;
  applications: Applicationstype;
}

export type GetStats = {
  thisMonth: Applicationstype[]
  lastMonth: Applicationstype[]
}

export type ChartDate = 'This Month' | 'Last Month' | 'All time'

export type Filter = 'All' | Status