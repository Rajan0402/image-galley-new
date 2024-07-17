import { deleteImage } from "@/server/queries";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest ) {
    const params = req.nextUrl.searchParams
    const id = params.get("imageId")

    const idAsNumber = Number(id);
    if (Number.isNaN(idAsNumber)) return new Response("Invalid image Id")

    await deleteImage(idAsNumber)
}