import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismaDB from "@/lib/prisma";
import { Store } from "@/types";

export async function POST(req: Request): Promise<NextResponse<Store>> {
  try {
    const { name } = await req.json();
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required!", { status: 422 });

    const newStore = await prismaDB.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(newStore);
  } catch (error) {
    console.log("[STORES_POST", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function PATCH(req: Request): Promise<NextResponse<Store>> {
  try {
    const { name, storeId } = await req.json();
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!name) return new NextResponse("Name is required!", { status: 422 });
    if (!storeId)
      return new NextResponse("Store ID is required!", { status: 422 });

    const updatedStore = await prismaDB.store.update({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log("[STORES_PATCH", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(req: Request): Promise<NextResponse<string>> {
  try {
    const { storeId } = await req.json();
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!storeId)
      return new NextResponse("Store ID is required!", { status: 422 });

    await prismaDB.store.delete({
      where: {
        id: storeId,
        userId,
      },
    });

    return NextResponse.json("Deleted store.");
  } catch (error) {
    console.log("[STORES_DELETE", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
