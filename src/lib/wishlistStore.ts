"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

interface WishlistItem {
  itemId: string;
  title: string;
  price: any;
  imageUrl: string;
}

interface WishlistState {
  wishlist: WishlistItem[];
  toggleWishlist: (product: any) => void;
  isFavorite: (itemId: string) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],

      toggleWishlist: (product) => {
        const currentWishlist = get().wishlist;
        const exists = currentWishlist.find((item) => item.itemId === product.itemId);

        let newWishlist;
        if (exists) {
          newWishlist = currentWishlist.filter((item) => item.itemId !== product.itemId);
        } else {
          const minimalProduct = {
            itemId: product.itemId,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl || (product.summaryImages && product.summaryImages[0]),
          };
          newWishlist = [...currentWishlist, minimalProduct];
        }

        set({ wishlist: newWishlist });
      },

      isFavorite: (itemId) => {
        return get().wishlist.some((item) => item.itemId === itemId);
      },
    }),
    {
      name: "performance_wishlist",
      storage: createJSONStorage(() => ({
        getItem: (name) => Cookies.get(name) || null,
        setItem: (name, value) => Cookies.set(name, value, { expires: 365, path: "/" }),
        removeItem: (name) => {
          Cookies.remove(name);
          return undefined;
        },
      })),
    }
  )
);