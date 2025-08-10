import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/lib/models";
export const runtime = "nodejs";

export async function POST(req) {
  const { username, password } = await req.json();
  await connectToDatabase();
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
