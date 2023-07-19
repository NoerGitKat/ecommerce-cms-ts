"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModalStore } from "@/hooks";
import { useEffect } from "react";

export default function SetupPage() {
  const { onOpen, isOpen, onClose } = useStoreModalStore();

  useEffect(() => {
    // Note: Can only close modal after store is created
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <main className="p-4">Root Page</main>;
}
