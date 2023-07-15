"use client";

import { useEffect, useState } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

const useFetchData = (
  category?: string
): {
  data: Product[];
  isLoading: boolean;
  error: string | null;
} => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = "https://fakestoreapi.com/products";
        if (category) {
          url += `/category/${encodeURIComponent(category)}`;
        }
        const res = await fetch(url);
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
  }, [category]);

  return { data, isLoading, error };
};

export default useFetchData;
