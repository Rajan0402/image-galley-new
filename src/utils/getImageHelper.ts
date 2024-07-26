import { getImage } from "@/server/queries";
import { getUser } from "@/server/queries";

export async function getImageHelper(photoId:string) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const user = await getUser();

  const image = await getImage(idAsNumber)
  const userInfo = {email: user?.email}
  
  return {image, userInfo}
}