"use client";

import { FC, useEffect, useState } from "react";
import Header from "../header";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import { toast } from "react-hot-toast";

interface BillBoardProps {}

const Billboard: FC<BillBoardProps> = (): JSX.Element => {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const params = useParams();
  const { push } = useRouter();

  useEffect(() => {
    async function fetchBillboards() {
      try {
        const response = await fetch(`/api/${params.storeId}/billboards`);
        if (!response.ok) throw new Error("Can't fetch billboards!");

        setBillboards(await response.json());
        toast.success("Successfully fetched billboards.");
      } catch (error) {
        toast.error(error as string);
      }
    }
    fetchBillboards();
  }, [params.storeId]);

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
    </>
  );
};

export default Billboard;
