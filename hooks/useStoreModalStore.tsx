import { create } from "zustand";

interface StoreModalType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useStoreModalStore = create<StoreModalType>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useStoreModalStore;
