import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Accessory } from "@/lib/models";
import { verifyAuthHeader } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  await connectToDatabase();
  const auth = verifyAuthHeader(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const colors = await Accessory.distinct("color");
    return NextResponse.json(colors);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
