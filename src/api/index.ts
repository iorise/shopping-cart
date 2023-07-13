"use client";

import { useEffect, useState } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem {
  productId: number
  quantity: number
}

const useFetchData = (): {
  data: Product[] | null;
  isLoading: boolean;
  error: string | null;
  addToCart: (productId: number, quantity: number) => void
  cart: CartItem[]
} => {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = (productId: number, quantity: number) => {
    const existingCartItem = cart.find((item) => item.productId === productId)

    if (existingCartItem) {
      const updatedCart = cart.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity + quantity}
        }
        return item
      })
      setCart (updatedCart)
    } else {
      setCart([...cart, { productId, quantity }])
    }
  }

  return { data, isLoading, error, addToCart, cart };
};

export default useFetchData;
