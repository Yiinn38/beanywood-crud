import { CustomersTable, CustomerPageClient } from "@/components";

async function getCustomers(page: number, limit: number, search?: string) {
  try {
    const { query } = await import("@/lib/db");

    let sql = "SELECT * FROM customers";
    const values: (string | number)[] = [];

    if (search) {
      sql += " WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?";
      const searchTerm = `%${search}%`;
      values.push(searchTerm, searchTerm, searchTerm);
    }

    const offset = (page - 1) * limit;
    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    values.push(limit, offset);

    const customers = await query(sql, values);

    let countSql = "SELECT COUNT(*) as total FROM customers";
    const countValues: (string | number)[] = [];
    if (search) {
      countSql += " WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?";
      const searchTerm = `%${search}%`;
      countValues.push(searchTerm, searchTerm, searchTerm);
    }

    const countResult = (await query(countSql, countValues)) as { total: number }[];
    const total = countResult[0].total;

    return {
      customers: JSON.parse(JSON.stringify(customers)),
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (e) {
    console.error(e);
    return { customers: [], total: 0, totalPages: 0 };
  }
}

export const metadata = {
  title: "Client Directory | Beanywood",
};

export default async function CustomersPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const search = resolvedParams.search || "";
  const limit = 5;

  const { customers, total, totalPages } = await getCustomers(page, limit, search);

  const { query } = await import("@/lib/db");
  const newClientsResult = (await query(`
      SELECT COUNT(*) as count 
      FROM customers 
      WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) 
      AND YEAR(created_at) = YEAR(CURRENT_DATE())
  `)) as { count: number }[];
  const newClientsCount = newClientsResult[0]?.count || 0;

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <nav className="space-y-1">
            <h1 className="text-3xl text-gray-900 font-bold tracking-tight">Client Directory</h1>
            <p className="text-gray-500">Manage your loyal customers, track purchases, and update details.</p>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative">
              <form className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input
                  name="search"
                  defaultValue={search}
                  type="search"
                  placeholder="Search clients..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 w-64"
                />
              </form>
            </div>
            <CustomerPageClient></CustomerPageClient>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Clients</div>
            <div className="text-3xl font-bold text-gray-900">{total.toLocaleString()}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-sm font-medium text-gray-500 mb-1">New This Month</div>
            <div className="text-3xl font-bold text-orange-600">{newClientsCount}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="text-sm font-medium text-gray-500 mb-1">Avg. Lifetime Value</div>
            <div className="text-3xl font-bold text-gray-900">$342.50</div>
          </div>
        </div>

        <CustomersTable customers={customers} totalPages={totalPages} currentPage={page} totalItems={total} />
      </div>
    </div>
  );
}
