"use client";

import { StoreModal } from "@/components/modals";
import { useMount } from "@/hooks";
import { FC } from "react";

const ModalProvider: FC = ({
  hasStore,
}: {
  hasStore: boolean;
}): JSX.Element | null => {
  const { isMounted } = useMount();

  if (!isMounted || hasStore) return null;

  return (
    <>
      <StoreModal />
    </>
  );
};

export default ModalProvider;
