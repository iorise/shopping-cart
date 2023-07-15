"use client";

import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import useFetchData from "@/api";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { toast } from "sonner";
import { AspectRatio } from "./ui/aspect-ratio";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useCart } from "@/context/cart-context";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  variant?: "default" | "switchable";
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
}

export function ProductCard({
  product,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const [isPending, startTransition] = React.useTransition();

  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const isProductInCart = cartItems.some(
    (item) => item.product.id === product.id
  );

  return (
    <Card
      className={cn("h-full overflow-hidden rounded-sm", className)}
      {...props}
    >
      <Link
        aria-label={`View ${product.title} details`}
        href={`/product/${product.id}`}
      >
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {product?.image?.length ? (
              <Image
                src={product.image}
                alt={product.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex h-full items-center justify-center bg-secondary"
              >
                <Icons.shoppingCart
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
      </Link>
      <Link
        aria-label={`View ${product.title} details`}
        href={`/product/${product.id}`}
      >
        <CardContent className="grid gap-2.5 p-4">
          <CardTitle className="line-clamp-1 text-base">
            {product.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {formatPrice(product.price)}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        {variant === "default" ? (
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <Link
              aria-label="Preview product"
              href={`/product-preview/${product.id}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-8 w-full rounded-sm",
              })}
            >
              Preview
            </Link>
            <Button
              aria-label="Add to cart"
              size="sm"
              className="h-8 w-full rounded-sm"
              onClick={() => {
                handleAddToCart(product);
              }}
              disabled={isProductInCart}
            >
              {isProductInCart ? "Added" : "Add to cart"}
            </Button>
          </div>
        ) : (
          <Button
            aria-label={isProductInCart ? "Remove from cart" : "Add to cart"}
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={() => handleAddToCart(product)}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner
                className="mr-2 h-4 animate-spin"
                aria-hidden="true"
              />
            ) : isProductInCart ? (
              <Icons.check className="mr-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <Icons.add className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {isProductInCart ? "Added" : "Add to cart"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
