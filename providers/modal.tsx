"use client";

import { StoreModal } from "@/components/modals";
import { useMount } from "@/hooks";
import { FC } from "react";

const ModalProvider: FC = (): JSX.Element | null => {
  const { isMounted } = useMount();

  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
};

export default ModalProvider;
