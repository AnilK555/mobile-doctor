import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:5001/api/accessories";

export async function GET(req, { params }) {
  const { id } = params;
  const token = req.headers.get("authorization");
  const res = await fetch(`${BACKEND_URL}/${id}`, {
    headers: { Authorization: token },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const token = req.headers.get("authorization");
  const res = await fetch(`${BACKEND_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const token = req.headers.get("authorization");
  const res = await fetch(`${BACKEND_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
