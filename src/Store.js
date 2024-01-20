import { create } from "zustand";
import zukeeper from "zukeeper";
export const useUserStore = create(
  zukeeper((set) => ({
    user: null,
    setUser: (data) => set(() => ({ user: data })),
    removeUser: () => set(() => ({ user: null })),
  }))
);
export const useProductStore = create(
  zukeeper((set) => ({
    products: [],
    setProducts: (data) => set(() => ({ products: data })),
  }))
);
window.store = useUserStore;
window.store = useProductStore;
