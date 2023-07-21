"use client";

import { StoreModal } from "@/components/modals";
import { useMount } from "@/hooks";
import { FC } from "react";

interface ModalProviderProps {}

const ModalProvider: FC<ModalProviderProps> = (): JSX.Element | null => {
  const { isMounted } = useMount();

  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
};

export default ModalProvider;
