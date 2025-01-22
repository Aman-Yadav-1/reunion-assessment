import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      title: 'Sample Task',
      priority: 1,
      status: 'pending',
      startDate: '2024-02-20',
      startTime: '10:00',
      endDate: '2024-02-20',
      endTime: '11:00'
    }
  ])
}

export async function POST(req: Request) {
  const data = await req.json()
  return NextResponse.json(data)
}
