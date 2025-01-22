export interface Task {
  id: string
  title: string
  priority: 1 | 2 | 3 | 4 | 5
  status: 'pending' | 'finished'
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

export interface TaskStats {
  totalTasks: number
  completedPercentage: number
  pendingPercentage: number
  averageCompletionTime: number
  pendingTasksSummary: {
    count: number
    timeElapsed: number
    timeToFinish: number
  }
}