import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismaDB from "@/lib/prisma";
import { Billboard } from "@/components/billboards";

interface BillboardsPageProps {
  params: {
    storeId: string;
  };
}

async function BillboardsPage({
  params,
}: BillboardsPageProps): Promise<JSX.Element> {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <main className="space-y-4 p-8 pt-6">
      <Billboard />
    </main>
  );
}

export default BillboardsPage;
