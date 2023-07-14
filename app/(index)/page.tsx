"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks";
import { useEffect } from "react";

export default function SetupPage() {
  const { onOpen, isOpen, onClose } = useStoreModal();

  useEffect(() => {
    // Note: Can only close modal after store is created
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <main className="p-4">Root Page</main>;
}
