import { connectDB } from '@/lib/db/connect'
import { Task } from '@/lib/db/models/Task'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export async function GET() {
  try {
    await connectDB()
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const totalTasks = await Task.countDocuments({ userId: session.user.id })
    const completedTasks = await Task.countDocuments({ 
      userId: session.user.id,
      status: 'finished'
    })

    const stats = {
      totalTasks,
      completedPercentage: (completedTasks / totalTasks) * 100,
      pendingPercentage: ((totalTasks - completedTasks) / totalTasks) * 100,
      // Add other stats calculations here
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
