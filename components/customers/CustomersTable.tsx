"use client";

import React, { useState } from "react";
import AddCustomerModal from "./AddCustomerModal";
import { useRouter } from "next/navigation";

interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  notes: string;
}

interface CustomerFormData {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  notes: string;
}

interface CustomersTableProps {
  customers: Customer[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export default function CustomersTable({ customers, totalPages, currentPage, totalItems }: CustomersTableProps) {
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock function to generate random purchase amount for UI demo
  const getPurchaseAmount = (id: number) => {
    // seeded random-ish based on id
    const amounts = [1240.0, 850.5, 0.0, 45.2, 3200.0];
    return amounts[id % amounts.length].toFixed(2);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleSave = async (customer: CustomerFormData) => {
    try {
      const isEditing = !!customer.id;
      const url = isEditing ? `/api/customers/${customer.id}` : "/api/customers";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save customer");
      }

      router.refresh(); // Refresh server components to show new data
      setIsModalOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save customer. Please try again.");
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Name</div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-20">Total Purchases</div>
        </div>

        <div>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <div key={customer.id} className="p-4 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 relative shrink-0">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-medium text-sm">
                      {/* Simple initial Avatar if no image */}
                      {customer.first_name[0]}
                      {customer.last_name[0]}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {customer.first_name} {customer.last_name}
                    </div>
                    <div className="text-gray-500 text-xs">{customer.phone_number}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-12">
                  <div className="text-sm font-medium text-gray-900 w-24 text-right">${getPurchaseAmount(customer.id)}</div>
                  <button
                    onClick={() => handleEdit(customer)}
                    className="text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">No customers found.</div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>
            Showing {(currentPage - 1) * 5 + 1} to {Math.min(currentPage * 5, totalItems)} of {totalItems} results
          </span>
          <div className="flex space-x-1">
            <button
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"<"}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 flex items-center justify-center border rounded ${
                  currentPage === page ? "border-orange-200 bg-orange-50 text-orange-600" : "border-gray-200 hover:bg-gray-50 text-gray-600"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>

      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSave}
        initialData={selectedCustomer}
      />
    </>
  );
}
