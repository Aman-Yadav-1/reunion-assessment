import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    highPriorityTasks: 0
  })
}