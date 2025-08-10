import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Accessory } from "@/lib/models";
import { verifyAuthHeader } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const doc = await Accessory.findById(id);
  if (!doc) return NextResponse.json({ error: "Accessory not found" }, { status: 404 });
  return NextResponse.json(doc);
}

export async function PUT(req, { params }) {
  await connectToDatabase();
  const auth = verifyAuthHeader(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = params;
  const body = await req.json();
  const doc = await Accessory.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(doc);
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const auth = verifyAuthHeader(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = params;
  await Accessory.findByIdAndDelete(id);
  return NextResponse.json({ message: "Accessory deleted" });
}
