import * as React from "react";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Icons } from "./icons";

interface PaginationButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  pageCount: number;
  page: string;
  per_page?: string;
  sort: string;
  createQueryString: (params: Record<string, string | number | null>) => string;
  router: AppRouterInstance;
  pathname: string;
  isPending: boolean;
  siblingCount?: number;
}

export function PaginationButton({
  pageCount,
  page,
  per_page,
  sort,
  createQueryString,
  router,
  pathname,
  isPending,
  siblingCount = 1,
  className,
  ...props
}: PaginationButtonProps) {
  const paginationRange = React.useMemo(() => {
    const delta = siblingCount + 2;

    const range = [];
    for (
      let i = Math.max(2, Number(page) - delta);
      i <= Math.min(pageCount - 1, Number(page) + delta);
      i++
    ) {
      range.push(i);
    }

    if (Number(page) - delta > 2) {
      range.unshift("...");
    }
    if (Number(page) + delta < pageCount - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (pageCount !== 1) {
      range.push(pageCount);
    }

    return range;
  }, [pageCount, page, siblingCount]);

  const handlePageClick = (pageNumber: number) => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageNumber,
        per_page: per_page ?? null,
        sort,
      })}`
    );
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handlePageClick(1)}
        disabled={Number(page) === 1 || isPending}
      >
        <Icons.chevronsLeft className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">First page</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handlePageClick(Number(page) - 1)}
        disabled={Number(page) === 1 || isPending}
      >
        <Icons.chevronLeft className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Previous page</span>
      </Button>
      {paginationRange.map((pageNumber, i) =>
        pageNumber === "..." ? (
          <Button
            aria-label="Page separator"
            key={i}
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled
          >
            ...
          </Button>
        ) : (
          <Button
            aria-label={`Page ${pageNumber}`}
            key={i}
            variant={Number(page) === pageNumber ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              router.push(
                `${pathname}?${createQueryString({
                  page: pageNumber,
                  per_page: per_page ?? null,
                  sort,
                })}`
              );
            }}
            disabled={isPending}
          >
            {pageNumber}
          </Button>
        )
      )}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => handlePageClick(Number(page) + 1)}
        disabled={Number(page) === (pageCount ?? 10) || isPending}
      >
        <Icons.chevronRight className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">Next page</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          router.push(
            `${pathname}?${createQueryString({
              page: pageCount ?? 10,
              per_page: per_page ?? null,
              sort,
            })}`
          );
        }}
        disabled={Number(page) === (pageCount ?? 10) || isPending}
      >
        <Icons.chevronsRight className="w-5 h-5" aria-hidden="true" />{" "}
        <span className="sr-only">Last page</span>
      </Button>
    </div>
  );
}
