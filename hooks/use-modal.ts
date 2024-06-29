import { create } from 'zustand';

interface Props<T> {
  isOpen: boolean;
  data: T | undefined
  setData: (data: T) => void;
  onOpen: () => void;
  onClose: () => void;
  clearData: () => void;
}

// const INITIAL_ITEMS_DATA: Props<{}>['data'] = {}

export const useDataImplementation = create<Props<{}>>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setData: (data) => set({ data }),
  clearData: () => set({ data: undefined })
}))

export const useModal = useDataImplementation as {
    <T>(): Props<T>;
    <T, U>(selector: (s: Props<T>) => U): U;
}