import { Header } from "@/components/header";
import { Shell } from "@/components/Shells/shell";
import { Products } from "@/components/products";
import getProduct from "@/app/action/get-product";

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { page, per_page, sort, categories } = searchParams;

  const data = await getProduct()

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const products = data.slice(offset, offset + limit);
  const pageCount = Math.ceil(data.length / limit);

  return (
    <div>
        <Shell>
          <Header
            title="Products"
            description="Find a wide selection of products that are attractive and according to your needs."
            size="sm"
          />
          <Products
            products={products}
            pageCount={pageCount}
            category={categories?.[0]}
            page={typeof page === "string" ? page : undefined}
            per_page={typeof per_page === "string" ? per_page : undefined}
            sort={typeof sort === "string" ? sort : undefined}
          />
        </Shell>
      
    </div>
  );
}
