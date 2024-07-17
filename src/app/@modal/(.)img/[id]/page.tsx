import { getImageHelper } from "@/utils/getImageHelper";
import { Modal } from "./modal";
import { FullPageImageView } from "@/common/full-page-image-view";

export default async function PhotoModal({ params: { id: photoId } }: { params: { id: string };}) {
  const {image, userInfo} = await getImageHelper(photoId)
  
  return (
    <div className="flex justify-center items-center">
      <Modal>
        <FullPageImageView image={image} userInfo={userInfo}/>
      </Modal>
    </div>
  );
}
