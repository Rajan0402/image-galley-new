"use client"

import { signupAction } from "@/utils/actions"
import { useFormState } from 'react-dom'

export default function SignUp() {
  const [error, formAction] = useFormState(signupAction, undefined)

  return (
    <div>
      <form action={formAction}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" className="text-black"/>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" className="text-black"/>
        <button type="submit" className="bg-slate-400">Sign up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}