import { useParams, useRouter } from "next/navigation";
import useStoreModalStore from "./useStoreModalStore";
import { Store } from "@prisma/client";
import { useState } from "react";

const useStoreSwitcher = (stores: Store[]) => {
  const { isOpen, onOpen, onClose } = useStoreModalStore();
  const [isOpenPopover, setIsOpenPopover] = useState<boolean>();
  const params = useParams();
  const { push } = useRouter();

  const storeItems = stores.map((store) => ({
    label: store.name,
    id: store.id,
  }));

  const activeStore = storeItems.find((store) => store.id === params.storeId);

  const onStoreSelect = (store: { label: string; id: string }) => {
    setIsOpenPopover(false);
    push(`/${store.id}`);
  };

  return {
    isOpenPopover,
    setIsOpenPopover,
    storeItems,
    activeStore,
    onStoreSelect,
    onOpen,
  };
};

export default useStoreSwitcher;
