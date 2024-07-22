"use client"

import { signInAction } from "@/utils/actions"
import { useFormState } from 'react-dom'

export default function SignIn() {
  const [error, formAction] = useFormState(signInAction, undefined)

  return (
    <div>
      <form action={formAction}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" className="text-black"/>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" className="text-black"/>
        <button type="submit" className="bg-slate-400">Sign in</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}