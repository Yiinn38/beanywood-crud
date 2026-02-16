import { query } from "./db";
import { RowDataPacket } from "mysql2";

export interface DashboardStats {
  totalSales: number;
  totalProducts: number;
  activeClients: number;
  dailyRevenue: number;
  lowStockCount: number;
}

export interface RecentActivityItem {
  id: string;
  product: string;
  customer: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
  image: string;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  // Parallelize queries for better performance
  const [productsCountResult, customersCountResult, lowStockResult] = await Promise.all([
    query("SELECT COUNT(*) as count FROM products"),
    query("SELECT COUNT(*) as count FROM customers"),
    query("SELECT COUNT(*) as count FROM products WHERE stock < 10"),
  ]);

  const totalProducts = (productsCountResult as RowDataPacket[])[0].count;
  const activeClients = (customersCountResult as RowDataPacket[])[0].count;
  const lowStockCount = (lowStockResult as RowDataPacket[])[0].count;

  // Mock data for sales and revenue
  const totalSales = 12450;
  const dailyRevenue = 840.5;

  return {
    totalSales,
    totalProducts,
    activeClients,
    dailyRevenue,
    lowStockCount,
  };
}

export async function fetchRecentActivity(): Promise<RecentActivityItem[]> {
  // Mock data for recent activity
  return [
    {
      id: "#4821",
      product: "Latte Grande",
      customer: "John Doe",
      amount: 4.5,
      status: "Completed",
      image: "latte.jpeg",
    },
    {
      id: "#4820",
      product: "Almond Croissant",
      customer: "Sarah Smith",
      amount: 3.75,
      status: "Completed",
      image: "croissant.jpeg", // Assuming we have this icon/image
    },
    {
      id: "#4819",
      product: "Bagel w/ Cream Cheese",
      customer: "Mike Johnson",
      amount: 5.25,
      status: "Pending",
      image: "bagel.jpeg",
    },
    {
      id: "#4818",
      product: "Cappuccino Small",
      customer: "Emma Wilson",
      amount: 3.95,
      status: "Completed",
      image: "cappuccino.jpeg",
    },
    {
      id: "#4817",
      product: "Matcha Latte",
      customer: "David Brown",
      amount: 5.5,
      status: "Completed",
      image: "matcha.jpeg",
    },
  ];
}

export async function fetchTrendingProduct() {
  // Check if we have an image url for the product in the db, otherwise mock
  // For now, let's try to get a real product from DB
  const result = await query("SELECT * FROM products ORDER BY price DESC LIMIT 1");
  const product = (result as RowDataPacket[])[0];

  if (product) {
    return {
      name: product.name,
      sold: 142, // Mocked
      price: Number(product.price),
      image: product.image_url || "latte.jpeg",
      tag: "#1 Seller",
    };
  }

  // Fallback mock
  return {
    name: "Caramel Macchiato",
    sold: 142,
    price: 5.5,
    image: "latte.jpeg",
    tag: "#1 Seller",
  };
}
