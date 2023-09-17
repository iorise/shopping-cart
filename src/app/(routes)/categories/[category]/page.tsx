import { Product } from "@/types";
import { Shell } from "@/components/Shells/shell";
import { Header } from "@/components/header";
import { Products } from "@/components/products";
import { toTitleCase } from "@/lib/utils";

interface CategoryPageProps {
  params: {
    category: Product["category"];
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

async function getCategory(category: string, sort?: string) {
  try {
    const apiUrl = `https://fakestoreapi.com/products/category/${category}?sort=${sort}`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error;
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = params;
  const { page, per_page, sort } = searchParams;

  const products = await getCategory(category, sort as string);
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const paginatedProducts = products.slice(offset, offset + limit);
  const pageCount = Math.ceil(products.length / limit);

  const formattedName = category.replace(/%20/g, " ");

  return (
    <div>
      <Shell>
        <Header
          title={toTitleCase(formattedName)}
          description={`Buy ${formattedName} from our best store`}
          size="sm"
        />
        <Products
          products={paginatedProducts}
          pageCount={pageCount}
          page={typeof page === "string" ? page : undefined}
          per_page={typeof per_page === "string" ? per_page : undefined}
          sort={typeof sort === "string" ? sort : undefined}
        />
      </Shell>
    </div>
  );
}
