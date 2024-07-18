import { FullPageImageView } from "@/common/full-page-image-view";
import { getImageHelper } from "@/utils/getImageHelper";

export default async function PhotoModal({params: { id: photoId }}: { params: { id: string };}) {
  const {image, userInfo} = await getImageHelper(photoId)

  return (
    <div className="flex justify-center">
      <FullPageImageView image={image} userInfo={userInfo} />
    </div>
  );
}
