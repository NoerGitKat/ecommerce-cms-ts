"use client";

import { Store } from "@prisma/client";
import { FC } from "react";
import Header from "../header";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import SettingsForm from "./Form";
import { redirect, useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface SettingsProps {
  store: Store;
}

const Settings: FC<SettingsProps> = ({ store }): JSX.Element => {
  const { storeId } = useParams();
  const { refresh, push } = useRouter();

  async function deleteStore() {
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
    }
  }

  return (
    <section>
      <aside className="flex items-center justify-between mb-4">
        <Header title="Settings" description="Manage store preferences" />
        <Button variant="destructive" size="icon" onClick={deleteStore}>
          <Trash className="" />
        </Button>
      </aside>
      <Separator />
      <SettingsForm store={store} />
    </section>
  );
};

export default Settings;
