import { ProductsTable, DateWidget } from "@/components";

async function getProducts(page: number, limit: number, category?: string) {
  try {
    const { query } = await import("@/lib/db");

    let sql = "SELECT * FROM products";
    const values: (string | number)[] = [];

    if (category) {
      sql += " WHERE category = ?";
      values.push(category);
    }

    const offset = (page - 1) * limit;
    sql += " LIMIT ? OFFSET ?";
    values.push(limit, offset);

    const products = await query(sql, values);

    let countSql = "SELECT COUNT(*) as total FROM products";
    const countValues: (string | number)[] = [];
    if (category) {
      countSql += " WHERE category = ?";
      countValues.push(category);
    }

    const countResult = (await query(countSql, countValues)) as { total: number }[];
    const total = countResult[0].total;

    return {
      products: JSON.parse(JSON.stringify(products)),
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (e) {
    console.error(e);
    return { products: [], total: 0, totalPages: 0 };
  }
}

export const metadata = {
  title: "Products Inventory | Beanywood",
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ page?: string; category?: string }> }) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const category = resolvedParams.category;
  const limit = 5;

  const { products, total, totalPages } = await getProducts(page, limit, category);

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <nav className="space-y-1">
            <h1 className="text-3xl text-gray-900 font-bold tracking-tight">Products Inventory</h1>
            <p className="text-gray-500">Manage your coffee blends, equipment, and merchandise.</p>
          </nav>

          <DateWidget />
        </div>

        <ProductsTable products={products} totalPages={totalPages} currentPage={page} currentCategory={category} totalItems={total} />
      </div>
    </div>
  );
}
