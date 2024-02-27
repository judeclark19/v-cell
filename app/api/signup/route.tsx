import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
// sign up new user
export async function POST(request: NextRequest) {
  // request body
  const body = await request.json();
  console.log("console log body", body);

  // connect to database
  const client = await clientPromise;
  const db = client.db("v-cell");
  const collection = db.collection("users");
  // check if user already exists
  const user = await collection.findOne({
    username: body.username
  });
  if (user) {
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 400 }
    );
  }
  // insert new user
  const result = await collection.insertOne({
    username: body.username,
    password: body.password
  });

  if (!result) {
    return NextResponse.json({ error: "User not added" }, { status: 500 });
  }

  return NextResponse.json(
    { success: "User added" },
    {
      status: 200
    }
  );
}
