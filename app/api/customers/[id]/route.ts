import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { first_name, last_name, email, phone_number, notes } = body;

    if (!first_name || !last_name || !email) {
      return NextResponse.json({ error: "First name, last name, and email are required" }, { status: 400 });
    }

    const sql = `
      UPDATE customers 
      SET first_name = ?, last_name = ?, email = ?, phone_number = ?, notes = ?
      WHERE id = ?
    `;

    await query(sql, [first_name, last_name, email, phone_number, notes || null, id]);

    return NextResponse.json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error("Error updating customer:", error);

    const dbError = error as { code?: string };
    if (dbError.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await query("DELETE FROM customers WHERE id = ?", [id]);
    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}
