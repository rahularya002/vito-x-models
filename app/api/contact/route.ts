// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, project, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("vb");
    const collection = db.collection("contacts");

    const result = await collection.insertOne({
      name,
      email,
      company,
      project,
      budget,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, insertedId: result.insertedId }, { status: 200 });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
