"use client";

import { signInAction } from "@/utils/actions";
// import { useFormState } from "react-dom";
import { useAuth } from "@/context/authProvider";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const { signin } = useAuth();

  const handleSuccess = async (responseData: any) => {
    signin(responseData);
    router.push("/");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await signInAction(formData);

    if (response && !response.error) {
      handleSuccess(response);
    } else {
      // Handle errors if needed
      console.error("Login failed:", response?.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" className="text-black" />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="text-black"
        />
        <button type="submit" className="bg-slate-400">
          Sign in
        </button>
      </form>
    </div>
  );
}

// "use client";

// import { signInAction } from "@/utils/actions";
// import { useFormState } from "react-dom";
// import { useAuth } from "@/context/authProvider";

// export default function SignIn() {
//   const [state, formAction] = useFormState(signInAction, undefined);
//   const { login } = useAuth();
//   // login(responseData);

//   return (
//     <div>
//       <form action={formAction}>
//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" name="email" className="text-black" />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           className="text-black"
//         />
//         <button type="submit" className="bg-slate-400">
//           Sign in
//         </button>
//       </form>
//       {state && <p>{state}</p>}
//     </div>
//   );
// }
