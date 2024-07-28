import SignedIn from "@/components/auth/signedIn";
import SignedOut from "@/components/auth/signedOut";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "@/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="max-w-96">
          <Link href={`/img/${image.id}`}>
            <div className="flex justify-center align-middle border-solid border-red-600 ">
              <Image src={image.url} alt={image.name} style={{ objectFit: "contain" }} width={384} height={384}/>
            </div>
          </Link>
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  )
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please Sign In
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
        and some randome gibberish
      </SignedIn>
    </main>
  );
}
