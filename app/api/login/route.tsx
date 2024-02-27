import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
// sign up new user
export async function POST(request: NextRequest) {
  // request body
  const body = await request.json();

  // connect to database
  const client = await clientPromise;
  const db = client.db("v-cell");
  const collection = db.collection("users");
  // check if user already exists
  const user = await collection.findOne({
    username: body.username
  });

  if (!user) {
    return NextResponse.json(
      { error: "Login credentials incorrect" },
      { status: 400 }
    );
  } else if (await bcrypt.compare(body.password, user.password)) {
    return NextResponse.json(
      { success: "Login successful" },
      {
        status: 200
      }
    );
  } else {
    return NextResponse.json(
      { error: "Login credentials incorrect" },
      { status: 400 }
    );
  }
}
