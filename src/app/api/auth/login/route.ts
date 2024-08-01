import { NextRequest, NextResponse } from "next/server";
import { validateEmail, validatePassword } from "@/utils/validateFormInput";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import * as jose from 'jose'
// import {  eq } from "drizzle-orm";

export async function POST(req: NextRequest ) {
  // get req data
  const body = await req.json()
  const {email, password} = body

  // validate email and password
  if(!validateEmail(email) || !validatePassword(password)){
    return NextResponse.json({ error: "Invalid email or password" } , { status: 400 })
  }

  // lookup the user in db
  const user = await db.query.users.findFirst({where: (model, { eq }) => eq(model.email, email)})
  if(!user) return NextResponse.json({error: "user does not exist"})

  const isPwdCorrect = bcrypt.compareSync(password, user.password)
  if(!isPwdCorrect) return NextResponse.json({error: "wrong credentials"})
  
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256"
  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({alg})
    .setExpirationTime("3d")
    .setSubject(user.id.toString())
    .sign(secret)

  // return response
  return NextResponse.json({token: jwt})
}