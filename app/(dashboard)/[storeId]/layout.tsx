import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import prismaDB from "@/lib/prisma";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  const stores = await prismaDB.store.findMany({
    where: {
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <>
      <Navbar stores={stores || []} />
      {children}
    </>
  );
}
