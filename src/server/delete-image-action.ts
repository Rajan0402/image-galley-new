"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { images } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import analyticsServerClient from "./analytics";

// import { deleteImage } from "@/server/queries";

export async function deleteImageAction(id:number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  revalidatePath("/")
  redirect("/");
}