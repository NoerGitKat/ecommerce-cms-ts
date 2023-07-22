import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismaDB from "@/lib/prisma";
import { Store } from "@/types";

export async function POST(req: Request): Promise<NextResponse<Store>> {
  try {
    const { name } = await req.json();
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
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
