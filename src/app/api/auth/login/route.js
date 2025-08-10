import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models";
import { signToken } from "@/lib/auth";
export const runtime = "nodejs";

export async function POST(req) {
  const { username, password } = await req.json();
  await connectToDatabase();
  try {
    const user = await User.findOne({ username });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    const token = signToken({ userId: user._id.toString() });
    return NextResponse.json({ token });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
