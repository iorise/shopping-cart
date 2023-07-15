"use client";

import { useCart } from "@/context/cart-context";
import { Shell } from "@/components/Shells/shell";
import { Icons } from "@/components/icons";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { cn, formatPrice } from "@/lib/utils";
import { StoredFile } from "@/types";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { Separator } from "@/components/ui/separator";
import AddToCartForm from "@/components/cart/add-to-cart-form";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = Number(params.productId);
  const [product, setProduct] = useState<Product | null>(null);
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([]);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => {
        console.error("Error fetching product:", error);
        setProduct(null);
      });
  }, [productId]);

  useEffect(() => {
    if (product && product.image) {
      const storedFile: StoredFile = {
        id: product.id,
        title: product.title,
        image: product.image,
      };
      setStoredFiles([storedFile]);
    } else {
      setStoredFiles([]);
    }
  }, [product]);

  return (
    <Shell>
      <div className="flex items-center space-x-1 text-sm capitalize text-muted-foreground">
        <div className="flex ">
          <div className="truncate">Products</div>
          <Icons.chevronRight className="h-4 w-4" aria-hidden="true" />
          <div className="text-foreground">{product?.category}</div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <ProductImageCarousel
            images={storedFiles}
            className="w-full md:w-1/2"
          />
          <Separator className="mt-4 md:hidden" />
          <div className="flex flex-col w-full gap-4 md:w-1/2">
            <div className="space-y-2">
              <h2 className="line-clamp-1 text-2xl font-bold">
                {product?.title}
              </h2>
              <p className="text-base text-muted-foreground">
                {formatPrice(product?.price ?? 0)}
              </p>
            </div>
            <Separator className="my-1.5" />
            <AddToCartForm product={product} />
            <Separator className="mt-5" />
            <p>{product?.description}</p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
