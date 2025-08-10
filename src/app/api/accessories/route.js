import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:5001/api/accessories";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const brand = searchParams.get("brand");
  const type = searchParams.get("type");
  const brandsList = searchParams.get("brandsList");
  let url = BACKEND_URL;
  const params = [];
  if (brand) params.push(`brand=${encodeURIComponent(brand)}`);
  if (type) params.push(`type=${encodeURIComponent(type)}`);
  if (brandsList) url += "/brands";
  if (params.length && !brandsList) url += `?${params.join("&")}`;
  const token = req.headers.get("authorization");
  const res = await fetch(url, {
    headers: { Authorization: token },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req) {
  const body = await req.json();
  const token = req.headers.get("authorization");
  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
