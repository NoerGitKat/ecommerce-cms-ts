"use client";

import { useStoreModalStore } from "@/hooks";
import { useEffect } from "react";

export default function SetupPage(): null {
  const { onOpen, isOpen } = useStoreModalStore();

  useEffect(() => {
    // Note: Can only close modal after store is created
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
