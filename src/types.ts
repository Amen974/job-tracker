export type Status = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export type Applications = {
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
  applications: Applications;
}

export type GetStats = {
  thisMonth: Applications[]
  lastMonth: Applications[]
}

export type ChartDate = 'This Month' | 'Last Month' | 'All time'