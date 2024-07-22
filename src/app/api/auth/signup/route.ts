import { NextRequest, NextResponse } from "next/server";
import { validateEmail, validatePassword } from "@/utils/validateFormInput";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import {v4 as uuidv4} from "uuid";

export async function POST(req: NextRequest ) {
  // get req data
  const body = await req.json()
  const {email, password} = body

  // validate email and password
  if(!validateEmail(email) || !validatePassword(password)){
    return NextResponse.json({ error: "Invalid email or password" } , { status: 400 })
  }

  // create user in db
  const hashedPwd = bcrypt.hashSync(password, 10);
  try {
    await db.insert(user).values({
      id: uuidv4(),
      email,
      password: hashedPwd
    });
  } catch (error) {
  }

  // return response
  return NextResponse.json({})
}