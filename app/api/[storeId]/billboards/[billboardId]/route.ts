import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismaDB from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) {
  const { userId } = auth();
  const { label, imageUrl } = await req.json();

  if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
  if (!label) return new NextResponse("Label is required", { status: 422 });
  if (!imageUrl)
    return new NextResponse("Image URL is required", { status: 422 });
  if (!params.billboardId)
    return new NextResponse("Existing billboard ID is required", {
      status: 400,
    });

  try {
    const storeByUserId = await prismaDB.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const patchedBillboard = await prismaDB.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(patchedBillboard);
  } catch (error) {
    console.log("[BILLBOARDS_ID_PATCH", error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } },
) {
  const { userId } = auth();

  if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
  if (!params.billboardId)
    return new NextResponse("Existing billboard ID is required", {
      status: 400,
    });
  try {
    const deletedBillboard = await prismaDB.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(deletedBillboard);
  } catch (error) {
    console.log("BILLBOARD_ID_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
