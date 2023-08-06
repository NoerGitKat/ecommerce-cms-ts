import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismaDB from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  const { userId } = auth();
  const { label, imageUrl } = await req.json();

  if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
  if (!label) return new NextResponse("Label is required", { status: 422 });
  if (!imageUrl)
    return new NextResponse("Image URL is required", { status: 422 });
  if (!params.storeId)
    return new NextResponse("Existing store ID is required", { status: 400 });

  try {
    const storeByUserId = await prismaDB.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const newBillboard = await prismaDB.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(newBillboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  if (!params.storeId)
    return new NextResponse("Existing store ID is required", { status: 400 });
  try {
    const billboards = await prismaDB.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    if (!billboards) throw new Error("Couldn't find billboards.");

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
