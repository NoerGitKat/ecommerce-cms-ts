"use client";

import { FC, useState } from "react";
import Header from "../header";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Billboard } from "@prisma/client";
import { toast } from "react-hot-toast";
import { AlertModal } from "../modals";
import { useRouter } from "next/navigation";

interface BillBoardHeaderProps {
  billboard: Billboard | null;
  storeId: string;
  billboardId: string;
}

const BillboardHeader: FC<BillBoardHeaderProps> = ({
  billboard,
  storeId,
  billboardId,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refresh, push } = useRouter();
  const deleteBillboard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/${storeId}/billboards/${billboardId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error(
          "Could not delete billboard. Please remove categories first.",
        );
      }
      refresh();
      push(`/${storeId}/billboards`);
      toast.success("Billboard successfully deleted.");
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const title = billboard ? "Edit billboard" : "Create billboard";
  const description = billboard
    ? "Edit your store's billboard"
    : "Create a new billboard for your store";
  return (
    <section className="flex justify-between items-center">
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={deleteBillboard}
        isLoading={isLoading}
      />
      <Header title={title} description={description} />
      {billboard && (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={() => setIsOpen(true)}
        >
          <Trash />
        </Button>
      )}
    </section>
  );
};

export default BillboardHeader;
