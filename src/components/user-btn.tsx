"use client"

import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { ProfileSVG, LogOutSVG } from "./svg";

export function UserButton() {
  return (
    <Popover placement="bottom-end" showArrow={true}>
      <PopoverTrigger>
        <Button className="p-0">
          <ProfileSVG/>
        </Button>
      </PopoverTrigger>
      <PopoverContent >
        <div className="absolute top-0 right-0 w-52 bg-zinc-700 rounded-lg py-2">
          <div className="px-2 pb-1 text-small border-gray-500 border-b">Profile</div>
          <div className="flex gap-2 items-center px-2 pt-1" onClick={() => window.alert("signed out")}><LogOutSVG/> Sign out</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}