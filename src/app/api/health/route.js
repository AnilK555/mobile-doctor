import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  let dbState = "disconnected";
  try {
    await connectToDatabase();
    const state = mongoose.connection.readyState; // 1 connected, 2 connecting
    dbState = state === 1 ? "connected" : state === 2 ? "connecting" : "disconnected";
  } catch (e) {
    dbState = "error";
  }
  return NextResponse.json({
    status: "ok",
    db: dbState,
    time: new Date().toISOString(),
    uptimeSec: Math.round(process.uptime()),
  });
}
