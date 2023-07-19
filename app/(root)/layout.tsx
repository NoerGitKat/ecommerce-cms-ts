import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismaDB from "@/lib/prisma";
import { ReactNode } from "react";

export default async function SetupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismaDB.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
}
