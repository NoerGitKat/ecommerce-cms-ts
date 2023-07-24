import Settings from "@/components/settings";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismaDB from "@/lib/prisma";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

async function SettingsPage({
  params,
}: SettingsPageProps): Promise<JSX.Element> {
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
    <main className="flex-col flex-1 space-y-4 p-8 pt-6">
      <Settings store={store} />
    </main>
  );
}

export default SettingsPage;
