import { FC } from "react";
import prismaDB from "@/lib/prisma";
import { BillboardForm, BillboardHeader } from "@/components/billboards";
import { Separator } from "@/components/ui/separator";

interface NewBillboardProps {
  params: { storeId: string; billboardId: string };
}

const NewBillboard: FC<NewBillboardProps> = async ({
  params,
}): Promise<JSX.Element> => {
  const billboard = await prismaDB.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <main className="space-y-4 p-8 pt-6">
      <BillboardHeader
        billboard={billboard}
        billboardId={params.billboardId}
        storeId={params.storeId}
      />
      <Separator />
      <BillboardForm
        billboard={billboard}
        billboardId={params.billboardId}
        storeId={params.storeId}
      />
    </main>
  );
};

export default NewBillboard;
