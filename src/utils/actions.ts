"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { verifyAuth } from "./auth";

export async function signupAction(currentState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(process.env.ROOT_URL + "/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const jsonResponse = await response.json();

  if (response.ok) {
    redirect("/signin");
  } else {
    return jsonResponse.error;
  }
}

export async function signInAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch(process.env.ROOT_URL + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const jsonResponse = await response.json();
    try {
      const payload = await verifyAuth(jsonResponse.token);
      console.log("verifiedToken-----", payload);

      cookies().set("Authorization", jsonResponse.token, {
        secure: true,
        httpOnly: true,
        expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
        path: "/",
        sameSite: "strict",
      });

      return { id: payload.sub, email };
    } catch (error) {
      return { error: "Token " };
    }
  } else {
    const jsonResponse = await response.json();
    return jsonResponse.error;
  }
}

export async function signOutAction() {}
