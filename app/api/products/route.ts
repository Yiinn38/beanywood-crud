import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");
    const category = searchParams.get("category");

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

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
