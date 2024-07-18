"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { downloadImage } from "@/server/downloadImage";

function DownloadSVG() {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
}

interface Image {
  name: string;
  id: number;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export function FullPageImageView({ image, userInfo }:{ image: Image, userInfo: {fullName:string | null} } ) {
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
              <div>{userInfo.fullName}</div>
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


