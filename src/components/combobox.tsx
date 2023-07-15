import { useDebounce } from "@/hooks/use-debounce";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import * as React from "react";
import useFetchData from "@/api";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Skeleton } from "./ui/skeleton";

export function Combobox() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [data, setData] = React.useState<
    | {
        category: Product["category"];
        products: Pick<Product, "id" | "title" | "category">[];
      }[]
    | null
  >(null);

  const { data: fetchData, isLoading } = useFetchData();

  const filterProducts = (query: string, fetchData: Product[]) => {
    const filteredData = fetchData.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    const groupedData = Array.from(
      new Set(filteredData.map((product) => product.category))
    ).map((category) => ({
      category,
      products: filteredData.filter((product) => product.category === category),
    }));

    return groupedData;
  };

  const handleSelect = (productId: number) => {
    router.push(`/product/${productId}`);
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (debouncedQuery.length === 0) {
      setData(null);
    } else {
      const filteredData = filterProducts(debouncedQuery, fetchData);
      setData(filteredData);
    }
  }, [debouncedQuery, fetchData]);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex text-xs">
          Search products...
        </span>
        <span className="sr-only">Search products</span>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />
         <CommandList>
          {isLoading ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : data && data.length > 0 ? (
            data.map((group) => (
              <CommandGroup
                key={group.category}
                title={group.category}
                className="capitalize"
              >
                {group.products.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleSelect(item.id)}
                  >
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))
          ) : (
            <CommandEmpty className="py-6 text-center text-sm">
              No products found
            </CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
