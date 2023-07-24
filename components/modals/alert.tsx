"use client";

import { useMount, useStoreModalStore } from "@/hooks";
import { Modal } from "../ui/modal";
import { FC } from "react";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const AlertModal: FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}): JSX.Element => {
  const { isMounted } = useMount();

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <section className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          Yes
        </Button>
      </section>
    </Modal>
  );
};

export default AlertModal;
