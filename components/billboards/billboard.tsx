"use client";

import { FC } from "react";
import Header from "../header";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "../ui/data-table";

interface BillBoardProps {
  billboards: BillboardColumn[];
}

const BillboardClient: FC<BillBoardProps> = ({ billboards }): JSX.Element => {
  const params = useParams();
  const { push } = useRouter();

  return (
    <>
      <section className="flex items-center justify-between">
        <Header
          title={`Billboards (${billboards.length})`}
          description="Manage billboards for your store"
        />
        <Button onClick={() => push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </section>
      <Separator />
      {billboards.length > 0 ? (
        <DataTable columns={columns} data={billboards} />
      ) : (
        <p>There are no billboards yet.</p>
      )}
    </>
  );
};

export default BillboardClient;
