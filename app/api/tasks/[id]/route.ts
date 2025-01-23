import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  const data = await request.json()
  return NextResponse.json(data)
}