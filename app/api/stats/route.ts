import { NextResponse } from "next/server"
import { headers } from "next/headers"

export const dynamic = 'force-dynamic'

export async function GET() {
  const headersList = headers()
  
  return NextResponse.json({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    highPriorityTasks: 0,
    lastUpdated: new Date().toISOString()
  }, {
    headers: {
      'Cache-Control': 'no-store'
    }
  })
}