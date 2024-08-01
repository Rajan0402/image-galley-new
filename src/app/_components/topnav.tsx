import SignedIn from "@/components/auth/signedIn";
import SignedOut from "@/components/auth/signedOut";
import { SimpleUploadButton } from "./simple-upload-button";
import { UserButton } from "@/components/user-btn";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>

      <div className="flex flex-row items-center gap-4 pr-3">
        <SignedOut>
          Sign in
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
