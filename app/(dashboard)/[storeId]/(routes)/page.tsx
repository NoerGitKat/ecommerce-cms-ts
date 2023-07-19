import prismaDB from "@/lib/prisma";
import { redirect } from "next/navigation";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

export default async function DashboardPage({
  params,
}: DashboardPageProps): JSX.Element {
  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return (
    <div>
      Dashboard of store: <b>{store.name}</b>
    </div>
  );
}
