import SignedIn from "@/components/auth/signedIn";
import SignedOut from "@/components/auth/signedOut";
import { SimpleUploadButton } from "./simple-upload-button";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

function ProfileSVG(/* {data-toggle, title, data-placement, data-content} */) {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" data-toggle="popover">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
  )
}
function LogOutSVG() {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1.3" stroke="currentColor" className="size-5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5"/>
    </svg>
  )
}

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
          <Popover placement="bottom-end" showArrow={true}>
            <PopoverTrigger>
              <Button className="p-0"><ProfileSVG/></Button>
            </PopoverTrigger>
            <PopoverContent >
              <div className=" absolute top-0 right-0 w-28 border border-red-900 bg-zinc-700 rounded-lg px-2 py-2">
                <div className="text-small">Profile</div>
                <div className="flex gap-2 items-center"><LogOutSVG/> Sign out</div>
              </div>
            </PopoverContent>
          </Popover>
        </SignedIn>
      </div>
    </nav>
  );
}
