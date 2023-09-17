import { Shell } from "@/components/Shells/shell";
import { Icons } from "@/components/icons";
import { formatPrice } from "@/lib/utils";
import React from "react";
import { Separator } from "@/components/ui/separator";
import AddToCartForm from "@/components/cart/add-to-cart-form";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

async function getProduct(productId: string): Promise<Product> {
  try {
    const apiUrl = `https://fakestoreapi.com/products/${productId}`;

    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
}

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params;
  const product = (await getProduct(productId)) as Product;

  return (
    <Shell>
      <div className="w-full flex flex-col items-center text-sm capitalize text-muted-foreground gap-3">
        <div className="w-full flex justify-start items-start">
          <Link href={"/products"} className="truncate">
            Products
          </Link>
          <Icons.chevronRight className="h-4 w-4" aria-hidden="true" />
          <div className="text-foreground">{product?.category}</div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <Image
            src={product?.image ?? ""}
            alt={product?.title}
            width={500}
            height={500}
            className="w-full md:w-1/2 aspect-square"
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
