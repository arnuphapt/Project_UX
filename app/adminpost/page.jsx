"use client";

import React from "react";
import Adminpost from "../components/Alladminpost";
export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="flex-1"> {/* matches sidebar width */}

        <main className="p-4">
          <Adminpost />

        </main>
      </div>
    </div>
  );
}