"use client";

import { useStoreModal } from "@/hooks";
import { Modal } from "../ui/modal";
import { FC } from "react";

const StoreModal: FC = (): JSX.Element => {
  const { isOpen, onClose } = useStoreModal();
  
  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      Create Store modal
    </Modal>
  );
};

export default StoreModal;
