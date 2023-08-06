"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";

interface SettingsFormProps {
  store: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

function SettingsForm({ store }: SettingsFormProps): JSX.Element {
  const params = useParams();
  const { refresh } = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  });

  const updateStore = async (values: SettingsFormValues) => {
    try {
      const response = await fetch("/api/stores", {
        method: "PATCH",
        body: JSON.stringify({ name: values.name, storeId: params.storeId }),
      });
      const updatedStore = await response.json();

      toast.success(`Name updated to: ${updatedStore.name}!`);
    } catch (error) {
      toast.error("Could not update store!");
    }

    refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(updateStore)}
        className="space-y-4 w-full my-4"
      >
        <aside className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="New store name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </aside>
        <Button
          disabled={form.formState.isSubmitting}
          variant="default"
          type="submit"
          className="ml-auto"
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
}

export default SettingsForm;
