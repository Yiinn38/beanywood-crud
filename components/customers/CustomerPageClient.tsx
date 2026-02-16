"use client";

import React, { useState } from "react";
import AddCustomerModal from "./AddCustomerModal";
import { useRouter } from "next/navigation";

interface CustomerData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  notes: string;
}

export default function CustomerPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSave = async (customer: CustomerData) => {
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save customer");
      }

      router.refresh();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Failed to save customer. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-orange-800 hover:bg-orange-900 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center transition-colors shadow-sm gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        Register New Client
      </button>

      <AddCustomerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
    </>
  );
}
