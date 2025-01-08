import SignedIn from "@/components/auth/signedIn";
import { getUser } from "@/server/queries";
import { useAuth } from "@/context/authProvider";

export default function Sample() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      sample route
      <form
        action={async () => {
          "use server";
          await getUser();
        }}
      >
        <button type="submit">getUser</button>
      </form>
      <SignedIn>signed In stuff</SignedIn>
    </div>
  );
}
