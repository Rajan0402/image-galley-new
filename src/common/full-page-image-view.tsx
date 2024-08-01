"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { downloadImage } from "@/utils/downloadImage";
import { DownloadSVG } from "@/components/svg"

interface Image {
  name: string;
  id: number;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export function FullPageImageView({ image, userInfo }:{ image: Image, userInfo: {email:string | undefined} } ) {
  const router = useRouter()

  const handleDeleteImage = async (e: MouseEvent) => {
    try {
      const response = await fetch(`/api/delete-image?imageId=${image.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete image");
      }

      router.back(); 
      router.refresh()
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  }
  
  function handleDownloadImage() {
    downloadImage(image.url, image.name)
  }

  return (
    <div className="max-w-7xl min-w-80 w-full min-h-[70%] bg-black border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700 text-sm lg:text-lg overflow-auto">
      <div className="flex flex-col p-4">
        <div className="flex flex-col min-w-0 h-full justify-center text-white lg:flex-row">
          <div className="flex items-center justify-center border-gray-700 border-b lg:border-b-0 lg:border-r lg:h-[70vh] lg:pr-4 pb-4">
            <img src={image.url} className="object-contain" alt={image.name} />
          </div>
          <div className="flex flex-shrink-0 flex-col gap-2 pt-4 lg:w-60 lg:pl-4">
            <div className="border-b text-lg">{image.name}</div>
            <div>
              <div>Uploaded By:</div>
              <div>{userInfo.email == undefined? "Unavailable": userInfo.email}</div>
            </div>
            <div>
              <div>Created On:</div>
              <div>{image.createdAt.toLocaleDateString()}</div>
            </div>
          
            <div className="flex flex-row gap-2 justify-between border-t border-gray-700 pt-4">
              <Button type="submit" variant="destructive" onClick={handleDeleteImage}>
                Delete
              </Button>
              
              <div>
                <Button type="submit" variant="link" className="flex gap-2" onClick={handleDownloadImage}>
                  Download
                  <DownloadSVG/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


