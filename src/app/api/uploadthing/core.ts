import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "@/lib/db";
import { images } from "@/lib/db/schema";
import { ratelimit } from "@/server/ratelimit";
import { getUser } from "@/server/queries";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    .middleware(async ({ req }) => {
      const user = await getUser();
      if (!user?.id) throw new UploadThingError("Unauthorized");

      // const fullUserData = await currentUser();

      // if (fullUserData?.privateMetadata?.["can-upload"] !== true)
      //   throw new UploadThingError("User Does Not Have Upload Permissions");

      const { success } = await ratelimit.limit(user.id);
      if (!success) throw new UploadThingError("Ratelimited");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
