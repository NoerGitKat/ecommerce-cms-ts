"use client";

import { Store } from "@prisma/client";
import { FC, useState } from "react";
import Header from "../header";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import SettingsForm from "./Form";
import { redirect, useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AlertModal } from "../modals";

interface SettingsProps {
  store: Store;
}

const Settings: FC<SettingsProps> = ({ store }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { storeId } = useParams();
  const { refresh, push } = useRouter();

  async function deleteStore() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stores", {
        method: "DELETE",
        body: JSON.stringify({ storeId }),
      });

      if (!response.ok) throw new Error("Couldn't delete store.");

      refresh();
      push("/");
      toast.success("Successfully deleted store!");
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }

  return (
    <section>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={deleteStore}
        isLoading={isLoading}
      />
      <aside className="flex items-center justify-between mb-4">
        <Header title="Settings" description="Manage store preferences" />
        <Button
          disabled={isLoading}
          variant="destructive"
          size="icon"
          onClick={() => setIsOpen(true)}
        >
          <Trash className="" />
        </Button>
      </aside>
      <Separator />
      <SettingsForm store={store} />
    </section>
  );
};

export default Settings;
