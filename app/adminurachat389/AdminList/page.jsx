"use client";

import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Adminpost from "../../components/admin/Adminpost";

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 pl-14 sm:pl-64"> {/* matches sidebar width */}
        <main className="p-4">
          <Adminpost />
        </main>
      </div>
    </div>
  );
}