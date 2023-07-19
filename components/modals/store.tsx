"use client";

import { useStoreModal } from "@/hooks";
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

const formSchema = z.object({
  name: z.string().min(3),
});

const StoreModal: FC = (): JSX.Element => {
  const { isOpen, onClose } = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const submit = async (values: z.infer<typeof formSchema>) => {
    console.log("values are", values);
    // TODO: Create store in DB
    onClose();
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
              <Button variant="outline" onClick={onClose}>
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
