import { NextResponse } from "next/server"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  return NextResponse.json({ ...data, id: params.id })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ success: true })
}
