import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json()
  return NextResponse.json(data)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true })
}
