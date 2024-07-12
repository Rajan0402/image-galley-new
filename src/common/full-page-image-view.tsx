import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { deleteImage, getImage } from "@/server/queries";

export async function FullPageImageView(props: { photoId: string }) {
  const idAsNumber = Number(props.photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImage(idAsNumber);

  const userInfo = await clerkClient().users.getUser(image.userId);

  return (
    <div className="max-w-7xl min-w-80 w-11/12 min-h-[70%] bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-sm lg:text-lg overflow-auto">
      <div className="flex flex-col min-w-0 h-full justify-center text-white lg:flex-row">
        <div className="flex items-center justify-center p-4 border-gray-700 border-b lg:border-b-0 lg:border-r lg:h-[70vh] h-full">
          <img src={image.url} className="object-contain" alt={image.name} />
        </div>
        <div className="flex flex-shrink-0 flex-col p-4 gap-2">
          <div className="border-b text-lg">{image.name}</div>

          <div>
            <div>Uploaded By:</div>
            <div>{userInfo.fullName}</div>
          </div>

          <div>
            <div>Created On:</div>
            <div>{image.createdAt.toLocaleDateString()}</div>
          </div>
          
          <div>
            <form
              action={async () => {
                "use server";

                await deleteImage(idAsNumber);
              }}
            >
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


