import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    let sql = "SELECT * FROM customers";
    const values: (string | number)[] = [];

    if (search) {
      sql += " WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?";
      const searchTerm = `%${search}%`;
      values.push(searchTerm, searchTerm, searchTerm);
    }

    // Get total count for pagination
    let countSql = "SELECT COUNT(*) as total FROM customers";
    const countValues: (string | number)[] = [];
    if (search) {
      countSql += " WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?";
      const searchTerm = `%${search}%`;
      countValues.push(searchTerm, searchTerm, searchTerm);
    }

    const countResult = (await query(countSql, countValues)) as { total: number }[];
    const total = countResult[0].total;

    // Add pagination to main query
    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    values.push(limit, offset);

    const customers = await query(sql, values);

    return NextResponse.json({
      customers: customers,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, phone_number, notes } = body;

    // Basic validation
    if (!first_name || !last_name || !email) {
      return NextResponse.json({ error: "First name, last name, and email are required" }, { status: 400 });
    }

    const sql = `
      INSERT INTO customers (first_name, last_name, email, phone_number, notes)
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = (await query(sql, [first_name, last_name, email, phone_number, notes || null])) as { insertId: number };

    return NextResponse.json({ id: result.insertId, message: "Customer created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);

    // Check for duplicate email
    if ((error as { code?: string }).code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}
