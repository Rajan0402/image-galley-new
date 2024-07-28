"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signupAction(currentState: any, formData: FormData) {
    const email = formData.get("email")
    const password = formData.get("password")
    
    const response = await fetch(process.env.ROOT_URL+"/api/auth/signup", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password})
    })

    const jsonResponse = await response.json()

    if(response.ok){
      redirect("/login");
    }else{
      return jsonResponse.error;
    }
}

export async function signInAction(currentState: any, formData: FormData) {
    const email = formData.get("email")
    const password = formData.get("password")
    
    const response = await fetch(process.env.ROOT_URL+"/api/auth/login", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password})
    })

    const jsonResponse = await response.json()

    cookies().set("Authorization", jsonResponse.token, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 3,
      path: "/",
      sameSite: "strict"
    })

    if(response.ok){
      redirect("/");
    }else{
      return jsonResponse.error;
    }
}