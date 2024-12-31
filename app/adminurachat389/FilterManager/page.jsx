"use client";
import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import FilterManager from "../../components/Filter/FilterManager";
export default function App() {

    return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0">
        <Sidebar />
      </div>
      <div className="flex-1 pl-14 sm:pl-64"> {/* matches sidebar width */}
        <main className="p-4">     
           <FilterManager/>
           </main>

           </div>
        </div>
    );
}
