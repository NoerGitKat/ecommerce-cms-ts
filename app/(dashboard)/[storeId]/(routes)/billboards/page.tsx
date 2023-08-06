import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismaDB from "@/lib/prisma";
import { BillboardClient } from "@/components/billboards";
import { BillboardColumn } from "@/components/billboards/columns";
import { format } from "date-fns";

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

  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    ({ id, label, createdAt }) => ({
      id,
      label,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    }),
  );

  return (
    <main className="space-y-4 p-8 pt-6">
      <BillboardClient billboards={formattedBillboards} />
    </main>
  );
}

export default BillboardsPage;
