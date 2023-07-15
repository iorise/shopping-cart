"use client";

import * as React from "react";

import { ProductCard } from "./product-card";
import { PaginationButton } from "./pagers/pagination-button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { Option, Product } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Icons } from "./icons";
import { sortOptions } from "@/config/products";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

interface ProductsProps {
  products: Product[];
  pageCount: number;
  category?: Product["category"];
  page?: string;
  per_page?: string;
  sort?: string;
}

export function Products({ products, pageCount, category }: ProductsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  // Search params
  const page = searchParams?.get("page") ?? "1";
  const per_page = searchParams?.get("per_page") ?? "8";
  const sort = searchParams?.get("sort") ?? "";

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  //  Price filter
  const [priceRangeValue, setPriceRangeValue] = React.useState<
    [number, number]
  >([0, 99999999]);
  const debouncePrice = useDebounce(priceRangeValue, 9999999);

  // React.useEffect(() => {
  //   const [min, max] = debouncePrice;
  //   const priceRangeParam = searchParams?.get("price_range");
  //   if (priceRangeParam)
  //     startTransition(() => {
  //       router.push(
  //         `${pathname}?${createQueryString({
  //           price_range: `${min}-${max}`,
  //         })}`
  //       );
  //     });
  // }, [debouncePrice]);

  // Category filter
  const [selectedCategories, setSelectedCategories] = React.useState<
    Option[] | null
  >(null);
  React.useEffect(() => {
    if (selectedCategories !== null) {
      startTransition(() => {
        const categoryValues = selectedCategories?.length
          ? selectedCategories.map((c) => c.value).join(",")
          : null;
        const queryString = createQueryString({ categories: categoryValues });
        router.push(`${pathname}?${queryString}`);
      });
    }
  }, [selectedCategories]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center space-x-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Filter products" size="sm" disabled>
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent className="flex-flex-col">
            <SheetHeader className="px-1">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="flex flex-col flex-1 gap-5 overflow-hidden px-1">
              <div className="space-y-4">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  Price range
                </h3>
                <Slider
                  variant="range"
                  thickness="thin"
                  defaultValue={[0, 500]}
                  max={500}
                  step={1}
                  value={priceRangeValue}
                  onValueChange={(value: typeof priceRangeValue) => {
                    setPriceRangeValue(value);
                  }}
                />
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={priceRangeValue[1]}
                    className="h-9"
                    value={priceRangeValue[0]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setPriceRangeValue([value, priceRangeValue[1]]);
                    }}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={priceRangeValue[0]}
                    max={500}
                    className="h-9"
                    value={priceRangeValue[1]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setPriceRangeValue([priceRangeValue[0], value]);
                    }}
                  />
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <SheetFooter>
              <Button
                aria-label="Clear filter"
                size="sm"
                className="w-full"
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        price_range: null,
                        categories: null,
                      })}`
                    );

                    setPriceRangeValue([0, 500]);
                    setSelectedCategories(null);
                  });
                }}
                disabled={isPending}
              >
                Clear Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Sort products "
              size="sm"
              disabled
              className="hover:cursor-not-allowed"
            >
              Sort{" "}
              <Icons.chevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn(option.value === sort && "font-bold")}
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        sort: option.value,
                      })}`
                    );
                  });
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isPending && !products.length ? (
        <div className="mx-auto flex max-w-xs flex-col space-y-1 5">
          <h1 className="text-center text-2xl font-bold">No products found</h1>
          <p className="text-center text-muted-foreground">
            Try changing your filters, or check back later for new products
          </p>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length ? (
        <PaginationButton
          pageCount={pageCount}
          page={page}
          per_page={per_page}
          sort={sort}
          createQueryString={createQueryString}
          router={router}
          pathname={pathname}
          isPending={isPending}
          startTransition={startTransition}
        />
      ) : null}
    </div>
  );
}
