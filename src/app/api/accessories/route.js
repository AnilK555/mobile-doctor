import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Accessory } from "@/lib/models";
import { verifyAuthHeader } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const brand = searchParams.get("brand");
  const type = searchParams.get("type");
  const color = searchParams.get("color");
  const brandsList = searchParams.get("brandsList");
  const colorsList = searchParams.get("colorsList");
  const typesList = searchParams.get("typesList");

  try {
    if (brandsList) {
      const brands = await Accessory.distinct("brand");
      return NextResponse.json(brands);
    }
    if (colorsList) {
      const colors = await Accessory.distinct("color");
      return NextResponse.json(colors);
    }
    if (typesList) {
      const types = await Accessory.distinct("type");
      return NextResponse.json(types);
    }
    const filter = {};
    if (brand) filter.brand = brand;
    if (type) filter.type = type;
    if (color) filter.color = color;
    const items = await Accessory.find(filter);
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connectToDatabase();
  const auth = verifyAuthHeader(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    let imageUrl = body.image;
    if (imageUrl && imageUrl.startsWith("data:image")) {
      const base64Data = imageUrl.split(",")[1];
      const imageSizeBytes = Math.ceil((base64Data.length * 3) / 4);
      if (imageSizeBytes > 1024 * 1024) {
        return NextResponse.json({ error: "Image size must be less than 1MB." }, { status: 400 });
      }
      const uploadRes = await cloudinary.uploader.upload(imageUrl, {
        folder: "accessories",
      });
      imageUrl = uploadRes.secure_url;
    }
    const doc = new Accessory({ ...body, image: imageUrl });
    await doc.save();
    return NextResponse.json(doc, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
