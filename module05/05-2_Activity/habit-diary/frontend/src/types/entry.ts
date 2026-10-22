export interface JournalEntry {
  id: number
  date: string
  activity_type: string
  description: string
  created_at: string
}

export type ActivityType =
  | 'Networking'
  | 'Skill Building'
  | 'Interview Prep'
  | 'Job Application'
  | 'Reflection'
