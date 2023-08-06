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
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import { ImageUpload } from "../image";

interface BillboardFormProps {
  storeId: string;
  billboardId: string;
  billboard: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

function BillboardForm({
  billboard,
  billboardId,
  storeId,
}: BillboardFormProps): JSX.Element {
  const { refresh, push } = useRouter();

  // Copy
  const toastMessage = billboard ? "Billboard updated." : "Billboard created.";
  const action = billboard ? "Save changes" : "Create";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: billboard || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: BillboardFormValues) => {
    const data = JSON.stringify({
      label: values.label,
      imageUrl: values.imageUrl,
    });
    try {
      if (billboard) {
        await fetch(`/api/${storeId}/billboards/${billboardId}`, {
          method: "PATCH",
          body: data,
        });
      } else {
        await fetch(`/api/${storeId}/billboards`, {
          method: "POST",
          body: data,
        });
      }
      refresh();
      push(`/${storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Could not create/edit billboard. Remove categories first.");
    }

    refresh();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full my-4"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    images={field.value ? [field.value] : []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <aside className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Billboard label" {...field} />
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
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default BillboardForm;
