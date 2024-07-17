import { getImage } from "@/server/queries";
import { clerkClient } from "@clerk/nextjs/server";

export async function getImageHelper(photoId:string) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber)
  const user = await clerkClient().users.getUser(image.userId)

  const userInfo = {fullName: user.fullName}
  
  return {image, userInfo}
}