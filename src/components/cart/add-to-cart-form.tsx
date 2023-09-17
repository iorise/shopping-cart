"use client"

import React, { useState } from "react";
import { useCart } from "@/context/cart-context";
import { Product } from "@/types";
import { Button } from "../ui/button";

interface AddToCartFormProps {
  product?: Product | null;
}

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setQuantity(1);
    }
  };

  const isProductInCart =
    product && cartItems.some((item) => item.product.id === product.id);

  return (
    <div>
      <Button aria-label="Add to cart" onClick={handleAddToCart} disabled={isProductInCart ? true : undefined}>
        {isProductInCart ? "Added" : "Add to cart"}
      </Button>
    </div>
  );
}
