import { getImage } from "@/server/queries";
import { clerkClient } from "@clerk/nextjs/server";

interface Image {
  name: string;
  id: number;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
  }

export async function getImageHelper(photoId:string) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  // let image: Image
  // const getImageAPI = async () => {
  //   const response = await fetch(`/api/get-image?imageId=${idAsNumber}`)
  //   if(!response.ok){
  //   console.log("got error ----------------------")
  //   return
  //   }
    
  //   image = await response.json()
  //   console.log(image)
  // }
  // getImageAPI()
  const image = await getImage(idAsNumber)
  const user = await clerkClient().users.getUser(image.userId)

  const userInfo = {fullName: user.fullName}
  

  return {image, userInfo}
}