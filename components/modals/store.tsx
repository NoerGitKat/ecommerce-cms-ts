"use client";

import { useStoreModalStore } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../ui/modal";
import { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-hot-toast";
import { Store } from "@/types";

const formSchema = z.object({
  name: z.string().min(3),
});

const StoreModal: FC = (): JSX.Element => {
  const { isOpen, onClose } = useStoreModalStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const submit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
        }),
      });
      const store: Store = await response.json();

      onClose();
      window.location.assign(`/${store.id}`);
    } catch (error) {
      console.error("Error on submit!", error);
      toast.error("Could not submit form. Try again later.");
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new product type."
      isOpen={isOpen}
      onClose={onClose}
    >
      <aside>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="I.e. clothing store" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <aside className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </aside>
          </form>
        </Form>
      </aside>
    </Modal>
  );
};

export default StoreModal;
